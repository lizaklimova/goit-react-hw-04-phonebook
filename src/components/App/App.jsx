import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from '../ContactsForm';
import ContactsList from '../ContactsList';
import FilterSearch from '../FilterSearch';
import { Container, ContactsSection } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLc = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLc);
    if (contactsFromLc) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = formState => {
    const { name, number } = formState;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [...contacts, contact]);
  };

  const filterSearch = e => {
    const { value } = e.currentTarget;

    setFilter(value);
  };

  const checkExistingContact = value => {
    return contacts.some(contact => contact.name === value);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactsForm
        addContact={addContact}
        checkContact={checkExistingContact}
      />

      <ContactsSection>
        <h2>Contacts</h2>
        <FilterSearch value={filter} onChange={filterSearch} />
        {filteredContacts.length ? (
          <ContactsList contacts={filteredContacts} onClick={deleteContact} />
        ) : (
          <p>No contacts found</p>
        )}
      </ContactsSection>
    </Container>
  );
}
