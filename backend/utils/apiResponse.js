const success = (res, data, message = "Success") => {
  return res.status(200).json({ success: true, message, data });
};

const error = (res, data, message = "Error", status = 500) => {
  return res.status(status).json({ success: false, message, data });
};

export default { success, error };
