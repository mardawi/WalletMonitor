//bootstrap database
var db = Ti.Database.open('WalletTransactions');
db.execute('CREATE TABLE IF NOT EXISTS category(id INTEGER PRIMARY KEY, name TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS source(id INTEGER PRIMARY KEY, name TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS deposite(id INTEGER PRIMARY KEY, amount REAL, date TEXT, source_id INTEGER DEFAULT 1 REFERENCES source(id) ON UPDATE CASCADE ON DELETE SET DEFAULT);');
db.execute('CREATE TABLE IF NOT EXISTS expense(id INTEGER PRIMARY KEY, amount REAL, date TEXT, category_id INTEGER DEFAULT 1 REFERENCES category(id) ON UPDATE CASCADE ON DELETE SET DEFAULT, description TEXT, latitude REAL, longitude REAL, address TEXT, photo_url TEXT, voice_note_url TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS expenceTag(expense_id INTEGER DEFAULT 1 REFERENCES expense(id) ON UPDATE CASCADE ON DELETE SET DEFAULT, tag_name TEXT);');

db.execute('INSERT OR REPLACE INTO category VALUES (1, "general category");');
db.execute('INSERT OR REPLACE INTO source VALUES (1, "general source");');

db.close();

exports.recentExpenses = function() {
	var expensesList = [];
	var db = Ti.Database.open('WalletTransactions');
	var result = db.execute('SELECT * FROM expense WHERE date BETWEEN datetime("now", "-1 month") AND datetime("now", "localtime")');
	while (result.isValidRow()) {
		expensesList.push({
			id : result.fieldByName('id'),
			amount : Number(result.fieldByName('amount')),
			date : result.fieldByName('date'),
			categoryId : result.fieldByName('category_id'),
			description : result.fieldByName('description'),
			latitude : Number(result.fieldByName('latitude')),
			longitude : Number(result.fieldByName('longitude')),
			address : result.fieldByName('address'),
			photoUrl : result.fieldByName('photo_url'),
			voiceNoteUrl : result.fieldByName('voice_note_url'),
		});
		result.next();
	}
	result.close();
	db.close();

	return expensesList;
};

exports.recentDeposites = function() {
	var depositesList = [];
	var db = Ti.Database.open('WalletTransactions');
	var result = db.execute('SELECT * FROM deposite WHERE date BETWEEN datetime("now", "-1 month") AND datetime("now", "localtime")');
	while (result.isValidRow()) {
		depositesList.push({
			id : result.fieldByName('id'),
			amount : Number(result.fieldByName('amount')),
			date : result.fieldByName('date'),
			sourceId : result.fieldByName('source_id')
		});
		result.next();
	}
	result.close();
	db.close();

	return depositesList;
};

exports.addExpense = function(amount, date, categoryId, description, latitude, longitude, address, photoUrl, voiceNoteUrl, tags) {
	var db = Ti.Database.open('WalletTransactions');
	var id = db.execute("INSERT INTO expense(amount, date, category_id, description, latitude, longitude, address, photo_url, voice_note_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", amount, date, categoryId, description, latitude, longitude, address, photoUrl, voiceNoteUrl);

	for(var i=0; i< tags.length; i++)
		db.execute('INSERT OR REPLACE INTO expenceTag VALUES (?, ?);', id, tags[i]);
	
	db.close();

	Ti.App.fireEvent("databaseUpdated");
};

exports.addCategory = function(categoryName) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute("INSERT INTO category(name) VALUES(?)", categoryName);
	db.close();

	Ti.App.fireEvent("databaseUpdated");
};

exports.addSource = function(sourceName) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute("INSERT INTO source(name) VALUES(?)", sourceName);
	db.close();

	Ti.App.fireEvent("databaseUpdated");
};

exports.addDeposite = function(amount, date, sourceId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute("INSERT INTO deposite(amount, date, source_id) VALUES(?, ?,?)", amount, date, sourceId);
	db.close();

	Ti.App.fireEvent("databaseUpdated");
};

exports.deleteExpense = function(expId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('DELETE FROM expense WHERE id = ?', expId);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.deleteCategory = function(catId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('DELETE FROM category WHERE id = ?', catId);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.deleteDeposite = function(depId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('DELETE FROM deposite WHERE id = ?', depId);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.deleteSource = function(sId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('DELETE FROM source WHERE id = ?', sId);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.editExpense = function(id, amount, date, categoryId, description, latitude, longitude, address, photoUrl, voiceNoteUrl, tags) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('UPDATE expense SET amount = ?, date = ?, category = ?, description = ?, latitude = ?, longitude = ?, address = ?, photo_url = ?, voice_note_url = ? WHERE id = ?', amount, date, categoryId, description, latitude, longitude, address, photoUrl, voiceNoteUrl, id);
	db.close();

	for(var i=0; i< tags.length; i++)
		db.execute('INSERT OR REPLACE INTO expenceTag VALUES (?, ?);', id, tags[i]);

	Ti.App.fireEvent('databaseUpdated');
};

exports.editCategory = function(id, categoryName) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('UPDATE category SET name = ? WHERE id = ?', categoryName, id);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.editSource = function(id, sourceName) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('UPDATE source SET name = ? WHERE id = ?', sourceName, id);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.editDeposite = function(id, amount, date, sourceId) {
	var db = Ti.Database.open('WalletTransactions');
	db.execute('UPDATE deposite SET amount = ?, date = ?, source = ? WHERE id = ?', amount, date, sourceId);
	db.close();

	Ti.App.fireEvent('databaseUpdated');
};

exports.getCategories = function(){
	var categoriesList = [];
	var db = Ti.Database.open('WalletTransactions');
	var result = db.execute('SELECT * FROM category');
	while (result.isValidRow()) {
		categoriesList.push({
			id : result.fieldByName('id'),
			name : result.fieldByName('name')
		});
		result.next();
	}
	result.close();
	db.close();

	return categoriesList;
};

exports.getSources = function(){
	var sourcesList = [];
	var db = Ti.Database.open('WalletTransactions');
	var result = db.execute('SELECT * FROM source');
	while (result.isValidRow()) {
		sourcesList.push({
			id : result.fieldByName('id'),
			name : result.fieldByName('name')
		});
		result.next();
	}
	result.close();
	db.close();

	return sourcesList;
};