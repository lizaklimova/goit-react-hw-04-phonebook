import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  ContactsFormEl,
  ContactsNameInput,
  ContactsNumberInput,
  Label,
  SubmitBtn,
} from './ContactsForm.styled';

export default function ContactsForm({ addContact, checkContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const idName = nanoid();
  const idTel = nanoid();

  const onChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const { value } = e.currentTarget.elements.name;

    checkContact(value)
      ? Notify.info(`Name ${value} already exists`)
      : addContact({ name, number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <ContactsFormEl autoComplete="off" onSubmit={onSubmit}>
      <Label htmlFor={idName}>Name</Label>
      <ContactsNameInput
        id={idName}
        type="text"
        name="name"
        onChange={onChange}
        value={name}
        placeholder="Full name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />
      <Label htmlFor={idTel}>Number</Label>
      <ContactsNumberInput
        id={idTel}
        type="tel"
        name="number"
        onChange={onChange}
        value={number}
        placeholder="123-45-67"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
      />
      <SubmitBtn type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
          ></path>
        </svg>
        Add contact
      </SubmitBtn>
    </ContactsFormEl>
  );
}
