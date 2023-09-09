from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
import datetime

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
CORS(app)
# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:secret@localhost/flaskdb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)


app.app_context().push()

# Declaring the table model
class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    number = db.Column(db.String(20), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, name, number):
        self.name = name
        self.number = number

# Declare schema
class ContactSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'number', 'created_at')

# (De)serialize your data
contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)

# Routing

# Routing - GET method
@app.route("/", methods=["GET"])
def get_contact():
    # Query the database to retrieve all contacts
    all_contacts = Contacts.query.all()

    # Serialize the list of contacts using the contacts_schema with many=True
    json_data = contacts_schema.dump(all_contacts)

    # Return the JSON data as the response
    return jsonify(json_data)
    

# Routing - POST method
@app.route("/add", methods=["POST"])
def add_contact():
    name = request.json['name']
    number = request.json['number']
    contacts = Contacts(name, number)
    db.session.add(contacts)
    db.session.commit()
    return contact_schema.jsonify(contacts)

# Routing - PUT method
@app.route("/update/<int:id>", methods=["PUT"])
def update_contact(id):
    # Get the contact by its ID
    contact = Contacts.query.get(id)
    if not contact:
        return jsonify({"message": "No such contact"}), 404
    
    # Update contact info based on request JSON data
    if 'name' in request.json:
        contact.name = request.json['name']
    if 'number' in request.json:
        contact.number = request.json['number']

    # Commit changes to database
    db.session.commit()

    return contact_schema.jsonify(contact)

# Routing - Delete method
@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_contact(id):
     # Get the contact by its ID
    contact = Contacts.query.get(id)
    if not contact:
        return jsonify({"message": "No such contact"}), 404
    
    # Delete the contact from the database
    db.session.delete(contact)
    # Commit changes to database
    db.session.commit()

    return jsonify({"message": "Contact deleted successfully"})

@app.route("/delete", methods=["DELETE"])
def delete_all_contacts():
    # Get all contact
    Contacts.query.delete()
    db.session.commit()
    return "All contacts deleted successfully", 204

if __name__ == "__main__":
    app.run(debug=True)