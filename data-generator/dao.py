import mysql.connector


def get_connection():
    connection = mysql.connector.connect(host='127.0.0.1',
                                database='db_grad_cs_1917',
                                user='root', password='ppp')
    return connection


def close_connection(connection):
    connection.close()


def select_counterparty_id(counterparty_name):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_counterparty_id = "SELECT counterparty_id FROM counterparty " \
                                 "WHERE counterparty_name = %s"
        cursor.execute(select_counterparty_id, (counterparty_name,))

        return cursor.fetchone()

    finally:
        cursor.close()
        close_connection(connection)


def get_credentials(user, password):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        select_counterparty_id = "SELECT * FROM users " \
                                 "WHERE user_id = %s and user_pwd = %s"
        cursor.execute(select_counterparty_id, (user,password))
        res = cursor.fetchall()
        return res

    finally:
        cursor.close()
        close_connection(connection)


print(get_credentials("debs", "gradprog2016@02"))




