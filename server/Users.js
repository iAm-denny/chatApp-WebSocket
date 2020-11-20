let users = [];

const addUser = ({id, name, room}) => {
    
  const user = { id, name, room };

  users.push(user);
  return { user };
};

const getUser = (id) => {
   return users.find((user) => user.id === id);
};

const getUserInRoom = (room) => {
    return users.filter((user) => user.room === room);
  
};
module.exports = { addUser, getUser, getUserInRoom };
