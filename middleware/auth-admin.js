exports.isAdmin = (...roles )=>{
   return (req, res, next) =>{
       console.log(req.user);
       console.log(roles);
       // check if the user role is in the array ['admin','supervisor']
       if(!roles.includes(req.user.role)){
           // not an admin
           return res.status(403).json({msg: 'no permission to access'})
       }
       next();
   }
}