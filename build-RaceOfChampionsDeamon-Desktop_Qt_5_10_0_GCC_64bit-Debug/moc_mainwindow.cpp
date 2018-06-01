/****************************************************************************
** Meta object code from reading C++ file 'mainwindow.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.10.0)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../RaceOfChampionsDeamon/mainwindow.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'mainwindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.10.0. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_MainWindow_t {
    QByteArrayData data[21];
    char stringdata0[284];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_MainWindow_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_MainWindow_t qt_meta_stringdata_MainWindow = {
    {
QT_MOC_LITERAL(0, 0, 10), // "MainWindow"
QT_MOC_LITERAL(1, 11, 12), // "WriteTextBox"
QT_MOC_LITERAL(2, 24, 0), // ""
QT_MOC_LITERAL(3, 25, 3), // "txt"
QT_MOC_LITERAL(4, 29, 14), // "sendDataSerial"
QT_MOC_LITERAL(5, 44, 4), // "data"
QT_MOC_LITERAL(6, 49, 14), // "openSerialPort"
QT_MOC_LITERAL(7, 64, 15), // "closeSerialPort"
QT_MOC_LITERAL(8, 80, 8), // "readData"
QT_MOC_LITERAL(9, 89, 11), // "handleError"
QT_MOC_LITERAL(10, 101, 28), // "QSerialPort::SerialPortError"
QT_MOC_LITERAL(11, 130, 5), // "error"
QT_MOC_LITERAL(12, 136, 18), // "on_bt_send_clicked"
QT_MOC_LITERAL(13, 155, 19), // "on_bt_setup_clicked"
QT_MOC_LITERAL(14, 175, 19), // "on_bt_start_clicked"
QT_MOC_LITERAL(15, 195, 19), // "on_bt_clear_clicked"
QT_MOC_LITERAL(16, 215, 15), // "onNewConnection"
QT_MOC_LITERAL(17, 231, 14), // "processMessage"
QT_MOC_LITERAL(18, 246, 7), // "message"
QT_MOC_LITERAL(19, 254, 18), // "socketDisconnected"
QT_MOC_LITERAL(20, 273, 10) // "sendSocket"

    },
    "MainWindow\0WriteTextBox\0\0txt\0"
    "sendDataSerial\0data\0openSerialPort\0"
    "closeSerialPort\0readData\0handleError\0"
    "QSerialPort::SerialPortError\0error\0"
    "on_bt_send_clicked\0on_bt_setup_clicked\0"
    "on_bt_start_clicked\0on_bt_clear_clicked\0"
    "onNewConnection\0processMessage\0message\0"
    "socketDisconnected\0sendSocket"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_MainWindow[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      14,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    1,   84,    2, 0x0a /* Public */,
       4,    1,   87,    2, 0x0a /* Public */,
       6,    0,   90,    2, 0x08 /* Private */,
       7,    0,   91,    2, 0x08 /* Private */,
       8,    0,   92,    2, 0x08 /* Private */,
       9,    1,   93,    2, 0x08 /* Private */,
      12,    0,   96,    2, 0x08 /* Private */,
      13,    0,   97,    2, 0x08 /* Private */,
      14,    0,   98,    2, 0x08 /* Private */,
      15,    0,   99,    2, 0x08 /* Private */,
      16,    0,  100,    2, 0x08 /* Private */,
      17,    1,  101,    2, 0x08 /* Private */,
      19,    0,  104,    2, 0x08 /* Private */,
      20,    1,  105,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void, QMetaType::QString,    3,
    QMetaType::Void, QMetaType::QString,    5,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 10,   11,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,   18,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QString,    5,

       0        // eod
};

void MainWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        MainWindow *_t = static_cast<MainWindow *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->WriteTextBox((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 1: _t->sendDataSerial((*reinterpret_cast< QString(*)>(_a[1]))); break;
        case 2: _t->openSerialPort(); break;
        case 3: _t->closeSerialPort(); break;
        case 4: _t->readData(); break;
        case 5: _t->handleError((*reinterpret_cast< QSerialPort::SerialPortError(*)>(_a[1]))); break;
        case 6: _t->on_bt_send_clicked(); break;
        case 7: _t->on_bt_setup_clicked(); break;
        case 8: _t->on_bt_start_clicked(); break;
        case 9: _t->on_bt_clear_clicked(); break;
        case 10: _t->onNewConnection(); break;
        case 11: _t->processMessage((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 12: _t->socketDisconnected(); break;
        case 13: _t->sendSocket((*reinterpret_cast< QString(*)>(_a[1]))); break;
        default: ;
        }
    }
}

const QMetaObject MainWindow::staticMetaObject = {
    { &QMainWindow::staticMetaObject, qt_meta_stringdata_MainWindow.data,
      qt_meta_data_MainWindow,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *MainWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *MainWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_MainWindow.stringdata0))
        return static_cast<void*>(this);
    return QMainWindow::qt_metacast(_clname);
}

int MainWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 14)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 14;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 14)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 14;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
