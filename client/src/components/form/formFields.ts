import { FormItem } from './FormCreator';

export const loginFields: FormItem[] = [
  {
    label: 'email',
    placeholder: 'Email'
  },
  {
    label: 'password',
    placeholder: 'Password'
  }
];

export const registerFields: FormItem[] = [
  {
    label: 'Name Row',
    row: [
      {
        label: 'firstName',
        placeholder: 'First Name'
      },
      {
        label: 'lastName',
        placeholder: 'Last Name'
      }
    ]
  },
  {
    label: 'email',
    placeholder: 'Email'
  },
  {
    label: 'password',
    placeholder: 'Password'
  }
];
