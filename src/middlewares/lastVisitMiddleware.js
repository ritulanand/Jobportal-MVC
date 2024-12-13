export const lastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    console.log("lastvisit");
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  } else {
    console.log("lastvisit else");
    res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};
