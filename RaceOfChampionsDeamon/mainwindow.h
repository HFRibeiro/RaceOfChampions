#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QtCore/QObject>
#include <QtCore/QList>
#include <QtWebSockets>
#include <QtCore>
#include <QDebug>
#include <cstdio>
#include <QMainWindow>
#include <QtSerialPort/QSerialPort>

QT_FORWARD_DECLARE_CLASS(QWebSocketServer)
QT_FORWARD_DECLARE_CLASS(QWebSocket)
QT_FORWARD_DECLARE_CLASS(QString)

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

public slots:
    void WriteTextBox(QString txt);

    void sendDataSerial(QString data);

private slots:
    void openSerialPort();

    void closeSerialPort();

    void readData();

    void handleError(QSerialPort::SerialPortError error);

    void on_bt_send_clicked();

    void on_bt_setup_clicked();

    void on_bt_start_clicked();

    void on_bt_clear_clicked();

    //WEB SOCKET

    void onNewConnection();

    void processMessage(const QString &message);

    void socketDisconnected();

private:
    Ui::MainWindow *ui;
    QSerialPort *serial;
    QWebSocketServer *m_pWebSocketServer;
    QList<QWebSocket *> m_clients;
};

#endif // MAINWINDOW_H
