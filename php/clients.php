<?php
header('Content-Type: application/json; charset=utf-8');

$jsonPath = __DIR__ . '/../data/clients.json';
$clients = [];

if (file_exists($jsonPath)) {
    $jsonContent = file_get_contents($jsonPath);
    if ($jsonContent !== false) {
        $decoded = json_decode($jsonContent, true);
        if (is_array($decoded)) {
            $clients = $decoded;
        }
    }
}

$search = isset($_GET['search']) ? trim($_GET['search']) : '';

if ($search !== '') {
    $clients = array_values(array_filter($clients, function ($client) use ($search) {
        $name = isset($client['name']) ? (string)$client['name'] : '';
        $email = isset($client['email']) ? (string)$client['email'] : '';
        return (stripos($name, $search) !== false || stripos($email, $search) !== false);
    }));
}

$sanitizedClients = array_map(function ($client) {
    return [
        'id'    => isset($client['id']) ? (int)$client['id'] : 0,
        'name'  => isset($client['name']) ? htmlspecialchars((string)$client['name'], ENT_QUOTES, 'UTF-8') : '',
        'email' => isset($client['email']) ? htmlspecialchars((string)$client['email'], ENT_QUOTES, 'UTF-8') : '',
        'phone' => isset($client['phone']) ? htmlspecialchars((string)$client['phone'], ENT_QUOTES, 'UTF-8') : '',
        'city'  => isset($client['city']) ? htmlspecialchars((string)$client['city'], ENT_QUOTES, 'UTF-8') : ''
    ];
}, $clients);

echo json_encode($sanitizedClients, JSON_UNESCAPED_UNICODE);