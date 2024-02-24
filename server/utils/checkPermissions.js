const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser._id === resourceUserId.toString()) return true;
  return false;
};

module.exports = checkPermissions;
