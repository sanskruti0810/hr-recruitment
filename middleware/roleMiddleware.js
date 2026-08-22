function authorizeRoles(...allowedRoles) {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthenticated' });
		}

		const userRole = req.user.role;
		if (!userRole || !allowedRoles.includes(userRole)) {
			return res.status(403).json({ message: 'Forbidden: insufficient role' });
		}

		return next();
	};
}

module.exports = { authorizeRoles };
