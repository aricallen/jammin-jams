const QRCode = require('qrcode');

const controller = async (req, res) => {
  const { url } = req.body;
  try {
    const dataUrl = await QRCode.toDataURL(url);
    res.send({ dataUrl });
  } catch (err) {
    res.status(400).send({ error: err, message: 'Unable to generate QR Code' });
  }
};

module.exports = { controller };
