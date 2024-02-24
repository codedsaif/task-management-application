const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser._id === resourceUserId.toString()) return;
  return res.status(401).send("Not authorized for this");
};

module.exports = checkPermissions;
