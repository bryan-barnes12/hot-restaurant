// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//tables (DATA)

const tables = [
	{
		uniqueID: '00',
		tableName: 'Wright',
		phone: '913-222-2222',
		email: 'wright.blake.t@gmail.com',
	},
];

const waitlist = [];

// Routes

// Basic route that sends the user first to the AJAX Page
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
router.get('/tables', (req, res) =>
	res.sendFile(path.join(__dirname, 'tables.html'))
);

router.get('/add', (req, res) =>
	res.sendFile(path.join(__dirname, 'add.html'))
);

// Displays all tables
router.get('/api/tables', (req, res) => res.json(tables));
router.get('/api/waitlist', (req, res) => res.json(waitlist));

// Create New tables - takes in JSON input
router.post('/api/tables', (req, res) => {
	// req.body hosts is equal to the JSON post sent from the user
	// This works because of our body parsing middleware
	const newRes = req.body;

	// Using a RegEx Pattern to remove spaces from newCharacter
	// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
	console.log(newRes);
	if (tables.length >= 5) {
		waitlist.push(newRes);
	} else {
		tables.push(newRes);
	}
	res.json(newRes);
});

// Starts the server to begin listening
app.use(router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
