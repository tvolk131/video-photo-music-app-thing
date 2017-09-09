const db = require('../connection');
const Sequelize = require('sequelize');
const bCrypt = require('bcryptjs');
const defaultTheme = 1;

const UserModel = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  oAuthUserId: {
    type: Sequelize.STRING(128)
  },
  oAuthProvider: {
    type: Sequelize.STRING(32)
  },
  email: {
    type: Sequelize.STRING(64),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING(64),
    unique: true
  },
  password: {
    type: Sequelize.STRING(64)
  },
  theme: {
    type: Sequelize.INTEGER(4)
  },
  name: {
    type: Sequelize.STRING(64)
  },
  handle: {
    type: Sequelize.STRING(32),
    unique: true
  },
  avatarUrl: {
    type: Sequelize.STRING(64)
  },
  description: {
    type: Sequelize.STRING(256)
  }
});

let User = {model: UserModel};

User.create = ({oAuthUserId, oAuthProvider, email, username, password, name, handle, avatarUrl, description}) => {
  if (oAuthUserId && oAuthProvider) {
    if (username) {
      return new Promise((resolve, reject) => {
        reject('Cannot create oAuth account with local username');
      });
    }
    if (password) {
      return new Promise((resolve, reject) => {
        reject('Cannot create oAuth account with local password');
      });
    }
  } else if (username && password) {
    if (oAuthUserId) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth ID');
      });
    }
    if (oAuthProvider) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth provider');
      });
    }
  } else {
    return new Promise((resolve, reject) => {
      reject('Cannot create account without neither oAuth nor local auth credentials');
    });
  }
  return User.model.create({
    oAuthUserId,
    oAuthProvider,
    email,
    username,
    password,
    theme: defaultTheme,
    name,
    handle,
    avatarUrl,
    description
  });
};

User.update = (userId, query) => {
  if (!query) {
    return Promise.reject('No update query was specified');
  }
  if (query.oAuthUserId || query.oAuthProvider) {
    return Promise.reject('Cannot modify oAuth data');
  }
  return User.getById(userId)
    .then((user) => {
      if (user.oAuthUserId && (query.username || query.password)) {
        return Promise.reject('Cannot update username or password fields when signed in through oAuth provider');
      }
      if (query.password) {
        let generateHash = (password) => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        query.password = generateHash(query.password);
      }
      return user.update(query);
    });
};

User.follow = (followerId, followeeId) => {
  if (followerId === followeeId) {
    return Promise.reject('Cannot follow yourself');
  }
  return User.getById(followerId)
    .then((follower) => {
      return User.getById(followeeId)
        .then((followee) => {
          followee.addFollower(follower);
        });
    })
    .then((response) => {
      return true;
    });
};

User.unfollow = (followerId, followeeId) => {
  return User.getById(followerId)
    .then((follower) => {
      return User.getById(followeeId)
        .then((followee) => {
          followee.removeFollower(follower);
        });
    })
    .then((response) => {
      return true;
    });
};

User.getFollowers = (userId) => {
  return User.model.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: User.model,
        as: 'follower',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  })
    .then((user) => {
      return user ? user.follower : Promise.reject('User does not exist');
    });
};

User.getFollows = (userId) => {
  return User.model.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: User.model,
        as: 'followee',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  })
    .then((user) => {
      return user ? user.followee : Promise.reject('User does not exist');
    });
};

User.getByEmail = (email) => {
  return User.model.findOne({
    where: {email}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

User.getByUsername = (username) => {
  return User.model.findOne({
    where: {username}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

User.getByHandle = (handle) => {
  return User.model.findOne({
    where: {handle}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

User.getById = (userId) => {
  return User.model.findById(userId)
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

// TODO - Write tests for this function
User.getByOAuthId = (oAuthUserId, oAuthProvider) => {
  return User.model.findOne({
    where: {oAuthUserId, oAuthProvider}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

module.exports = User;