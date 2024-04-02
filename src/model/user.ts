const UserSchema = {
  name: 'User',
  properties: {
    email: 'string',
    password: 'string',
    name: 'string',
    phone: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
  primaryKey: 'email',
};

export default UserSchema;
