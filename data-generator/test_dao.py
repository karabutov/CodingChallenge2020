from dao import select_counterparty_id, select_instrument_id, insert_data


class TestDAO(object):
    def test_select_counterparty_id(self):
        initial_value = "Lewis"
        result, = select_counterparty_id(initial_value)
        expected_result = 701

        assert result == expected_result

    def test_select_instrument_id(self):
        initial_value = "Astronomica"
        result, = select_instrument_id(initial_value)
        expected_result = 1001

        assert result == expected_result

    def test_insert_data(self):
        initial_value = {
            'instrumentName': 'Astronomica',
            'cpty': 'Lewis',
            'price': 20,
            'type': "S",
            'quantity': 10,
            'time': '23-Aug-2020 (10:49:33.525247)',
        }
        insert_data(initial_value)
        pass
