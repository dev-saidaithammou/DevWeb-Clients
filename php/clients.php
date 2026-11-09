<?php
header('Content-Type: application/json; charset=utf-8');

function getClientsData(): array {
    $filePath = __DIR__ . '/../data/clients.json';
    if (!file_exists($filePath)) {
        return [];
    }
    $content = file_get_contents($filePath);
    return json_decode($content, true) ?? [];
}

echo json_encode(getClientsData());