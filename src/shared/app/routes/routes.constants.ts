// const Search = 'search';
const List = 'get';
const Detail = 'detail/:id';
const Create = 'create';
const Update = 'update';
const Delete = 'delete/:id';

export const Routes = {
  Auth: {
    ApiTags: `Auth`,
    Controller: `auth`,
    // Search,
    // Detail,
    // Create,
    // Update,
    // Delete,
    signUp: `sign-up`,
    signIn: `sign-in`,
  },

  User: {
    ApiTags: `User`,
    Controller: `user`,
    List,
    // Search,
    Detail,
    Create,
    Update,
    Delete,
  },

  UserGroup: {
    ApiTags: `UserGroup`,
    Controller: `user-group`,
    List,
    // Search,
    Detail,
    Create,
    Update,
    Delete,
  },
};
