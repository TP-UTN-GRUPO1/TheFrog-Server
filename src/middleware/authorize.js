
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.Role?.roleName;
  
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "No tienes permiso para acceder" });
      }
  
      next();
    };
  };
  