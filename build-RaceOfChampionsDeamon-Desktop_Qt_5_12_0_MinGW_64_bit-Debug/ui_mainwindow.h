/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.12.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtGui/QIcon>
#include <QtWidgets/QApplication>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPlainTextEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QGridLayout *gridLayout;
    QPushButton *bt_clear;
    QPushButton *bt_send;
    QLineEdit *tb_send;
    QHBoxLayout *horizontalLayout;
    QPushButton *bt_setup;
    QPushButton *bt_start;
    QPlainTextEdit *tb_recieve;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(400, 300);
        QIcon icon;
        icon.addFile(QString::fromUtf8(":/logo.png"), QSize(), QIcon::Normal, QIcon::Off);
        MainWindow->setWindowIcon(icon);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        gridLayout = new QGridLayout(centralWidget);
        gridLayout->setSpacing(6);
        gridLayout->setContentsMargins(11, 11, 11, 11);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        bt_clear = new QPushButton(centralWidget);
        bt_clear->setObjectName(QString::fromUtf8("bt_clear"));

        gridLayout->addWidget(bt_clear, 3, 0, 1, 2);

        bt_send = new QPushButton(centralWidget);
        bt_send->setObjectName(QString::fromUtf8("bt_send"));

        gridLayout->addWidget(bt_send, 4, 1, 1, 1);

        tb_send = new QLineEdit(centralWidget);
        tb_send->setObjectName(QString::fromUtf8("tb_send"));

        gridLayout->addWidget(tb_send, 4, 0, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        bt_setup = new QPushButton(centralWidget);
        bt_setup->setObjectName(QString::fromUtf8("bt_setup"));

        horizontalLayout->addWidget(bt_setup);

        bt_start = new QPushButton(centralWidget);
        bt_start->setObjectName(QString::fromUtf8("bt_start"));

        horizontalLayout->addWidget(bt_start);


        gridLayout->addLayout(horizontalLayout, 5, 0, 1, 2);

        tb_recieve = new QPlainTextEdit(centralWidget);
        tb_recieve->setObjectName(QString::fromUtf8("tb_recieve"));

        gridLayout->addWidget(tb_recieve, 2, 0, 1, 2);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QString::fromUtf8("horizontalLayout_2"));
        label = new QLabel(centralWidget);
        label->setObjectName(QString::fromUtf8("label"));
        label->setMaximumSize(QSize(100, 100));
        label->setFrameShape(QFrame::NoFrame);
        label->setPixmap(QPixmap(QString::fromUtf8(":/logo.png")));
        label->setScaledContents(true);
        label->setAlignment(Qt::AlignCenter);
        label->setWordWrap(false);
        label->setMargin(0);
        label->setIndent(-1);
        label->setOpenExternalLinks(false);

        horizontalLayout_2->addWidget(label);


        gridLayout->addLayout(horizontalLayout_2, 1, 0, 1, 2);

        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "RaceOfChampionsDeamon", nullptr));
        bt_clear->setText(QApplication::translate("MainWindow", "Clear", nullptr));
        bt_send->setText(QApplication::translate("MainWindow", "Send", nullptr));
        bt_setup->setText(QApplication::translate("MainWindow", "Setup", nullptr));
        bt_start->setText(QApplication::translate("MainWindow", "Start", nullptr));
        label->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
