<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";    
$dbname = "proyecto_final";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    if ($nombre) {
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre) VALUES (?)");
        $stmt->bind_param("s", $nombre);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Usuario registrado"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al registrar usuario"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Nombre inválido"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM usuarios ORDER BY fecha_ingreso DESC");
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode($usuarios);
}

$conn->close();
