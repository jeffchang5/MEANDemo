module.exports = {
	key: process.env.GOOGLE_API_KEY,
	url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
	parameters: 'query=restaurants&location=42.260189,-83.027957&radius=5000&name=tim%20hortons'
}