#include "mainwindow.h"
#include "ui_mainwindow.h"

QString serial_port_name = "COM9";
int port = 1234;

using namespace std;

QT_USE_NAMESPACE

static QString getIdentifier(QWebSocket *peer);

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    ui->label->setScaledContents(true);

    serial = new QSerialPort(this);

    connect(serial, SIGNAL(error(QSerialPort::SerialPortError)), this,
            SLOT(handleError(QSerialPort::SerialPortError)));

    connect(serial, SIGNAL(readyRead()), this, SLOT(readData()));

    openSerialPort();


    m_pWebSocketServer = new QWebSocketServer(QStringLiteral("Chat Server"), QWebSocketServer::NonSecureMode, this);
    if (m_pWebSocketServer->listen(QHostAddress::Any, port))
    {
        QTextStream(stdout) << "Chat Server listening on port " << port << '\n';
        connect(m_pWebSocketServer, &QWebSocketServer::newConnection,
                this, &MainWindow::onNewConnection);
    }

}

MainWindow::~MainWindow()
{
    qDebug() << "Destroy";
    closeSerialPort();
    m_pWebSocketServer->close();
    delete ui;
}

void MainWindow::WriteTextBox(QString txt)
{
    ui->tb_recieve->appendPlainText(txt);
}

void MainWindow::openSerialPort()
{
    serial->setPortName(serial_port_name);
    serial->setBaudRate(QSerialPort::Baud115200);
    serial->setDataBits(QSerialPort::Data8);
    serial->setParity(QSerialPort::NoParity);
    serial->setStopBits( QSerialPort::OneStop);
    serial->setFlowControl(QSerialPort::SoftwareControl);

    if (serial->open(QIODevice::ReadWrite)) qDebug() << "Opened:" << serial_port_name;
    else qDebug() <<  tr("Error") << serial->errorString();

}

void MainWindow::closeSerialPort()
{
    if (serial->isOpen())
    {
       serial->close();
    }
}

void MainWindow::readData()
{
    if(serial->canReadLine())
    {
        QString data_serial = serial->readLine();
        if(!data_serial.contains("$")) ui->tb_recieve->appendPlainText("Recieve Serial: "+data_serial);
        sendSocket(data_serial);
    }
}

void MainWindow::handleError(QSerialPort::SerialPortError error)
{
    if (error == QSerialPort::ResourceError)
    {
        qDebug() << tr("Critical Error") << serial->errorString();
        closeSerialPort();
    }
}


void MainWindow::sendDataSerial(QString data)
{
    if(serial->isOpen())
    {
        serial->write(data.toLocal8Bit()+'\n');
         qDebug() << "Send Serial: "+data.toLocal8Bit();
    }
    else qDebug() << "Closed" << serial_port_name;
}


void MainWindow::on_bt_send_clicked()
{
    QString txt = ui->tb_send->text();
    sendDataSerial(txt);
}

void MainWindow::on_bt_setup_clicked()
{
    sendDataSerial("S");
}

void MainWindow::on_bt_start_clicked()
{
    sendDataSerial("A");
}

void MainWindow::on_bt_clear_clicked()
{
    ui->tb_recieve->clear();
}

//WEB SOCKET

void MainWindow::onNewConnection()
{
    auto pSocket = m_pWebSocketServer->nextPendingConnection();
    qDebug() << getIdentifier(pSocket) << " connected!\n";
    pSocket->setParent(this);

    connect(pSocket, &QWebSocket::textMessageReceived,
            this, &MainWindow::processMessage);
    connect(pSocket, &QWebSocket::disconnected,
            this, &MainWindow::socketDisconnected);

    m_clients << pSocket;
}
//! [onNewConnection]

//! [processMessage]
void MainWindow::processMessage(const QString &message)
{
    qDebug() << message;
    ui->tb_recieve->appendPlainText("Recieved websocket: "+message);
    sendDataSerial(message);

}
//! [processMessage]

//! [socketDisconnected]
void MainWindow::socketDisconnected()
{
    QWebSocket *pClient = qobject_cast<QWebSocket *>(sender());
    qDebug() << getIdentifier(pClient) << " disconnected!\n";
    if (pClient)
    {
        m_clients.removeAll(pClient);
        pClient->deleteLater();
    }
}

void MainWindow::sendSocket(QString data)
{
    for (QWebSocket *pClient : qAsConst(m_clients)) pClient->sendTextMessage(data);
}

static QString getIdentifier(QWebSocket *peer)
{
    return QStringLiteral("%1:%2").arg(peer->peerAddress().toString(),
                                       QString::number(peer->peerPort()));
}
