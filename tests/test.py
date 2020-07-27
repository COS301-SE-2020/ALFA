from app import app
import json
import unittest

class FlaskTest(unittest.TestCase):
	log_entry = "[Sat May 09 22:22:02.764481 2020] [:error] [pid 4872] [client 127.0.0.1:51528] PHP Warning:  mysqli_connect(): (HY000/1044): Access denied for user 'u16186258 to database 'musicbox' in /home/cs/students/u16186258/COS216/practical3/config.php on line 10"
	payload = json.dumps({
		"entry": log_entry
	})
	
	# '/' home endpoint

	# Check for response 200
	def test_index(self):
		tester = app.test_client(self)
		response = tester.get("/")
		statuscode = response.status_code
		self.assertEqual(statuscode, 200)

	# Check if content return is application/json
	def test_index_content(self):
		tester = app.test_client(self)
		response = tester.get("/")
		self.assertEqual(response.content_type, "application/json")

	# Check for data returned
	def test_index_data(self):
		tester = app.test_client(self)
		response = tester.get("/")
		self.assertTrue(b'message' in response.data)

	# '/analyse' endpoint

	# Check for response 200
	def test_index_analyse(self):
		tester = app.test_client(self)
		response = tester.post('/analyse', headers={"Content-Type": "application/json"}, data=self.payload)
		statuscode = response.status_code
		self.assertEqual(statuscode, 200)

	# Check if content returned in application/json
	def test_analyse_content(self):
		tester = app.test_client(self)
		response = tester.post('/analyse', headers={"Content-Type": "application/json"}, data=self.payload)
		self.assertEqual(response.content_type, "application/json")

	# Check for data returned
	def test_index_data_1(self):
		tester = app.test_client(self)
		response = tester.post('/analyse', headers={"Content-Type": "application/json"}, data=self.payload)
		self.assertTrue(b'description' in response.data)

	# Check for data returned
	def test_index_data_2(self):
		tester = app.test_client(self)
		response = tester.post('/analyse', headers={"Content-Type": "application/json"}, data=self.payload)
		self.assertTrue(b'link' in response.data)

if __name__ == "__main__":
	unittest.main()