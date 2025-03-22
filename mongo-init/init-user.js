const db = db.getSiblingDB('os-system');

if (!db.users.findOne({ username: "admin" })) {
  db.users.insertOne({
    username: "admin",
    password: "1234" // Hash para "1234"
  });
  print("Usuário 'admin' com senha '1234' criado com sucesso!");
} else {
  print("Usuário 'admin' já existe, pulando criação.");
}