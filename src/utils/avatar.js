function randomAvatar(user, size = 256) {
  const seed = encodeURIComponent(user.id || user.email || "guest");
  // dùng style adventurer thay vì identicon
  return `https://api.dicebear.com/7.x/pixel-art/png?seed=${seed}&size=${size}`;
}

module.exports = { randomAvatar };
