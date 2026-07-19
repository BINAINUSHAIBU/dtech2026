<?php
/**
 * ===========================================
 * BTECH-TV WORLD ULTRA MAX X
 * API: playlist.php
 * ===========================================
 */

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Cache-Control: no-cache");

/*
|--------------------------------------------------------------------------
| Demo Playlist Sources
|--------------------------------------------------------------------------
*/

$playlists = [

    [
        "id" => 1,
        "name" => "Global IPTV",
        "type" => "m3u",
        "url" => "https://iptv-org.github.io/iptv/index.m3u",
        "status" => "online"
    ],

    [
        "id" => 2,
        "name" => "Countries",
        "type" => "m3u",
        "url" => "https://iptv-org.github.io/iptv/index.country.m3u",
        "status" => "online"
    ],

    [
        "id" => 3,
        "name" => "Categories",
        "type" => "m3u",
        "url" => "https://iptv-org.github.io/iptv/index.category.m3u",
        "status" => "online"
    ],

    [
        "id" => 4,
        "name" => "Languages",
        "type" => "m3u",
        "url" => "https://iptv-org.github.io/iptv/index.language.m3u",
        "status" => "online"
    ],

    [
        "id" => 5,
        "name" => "BTECH-TV Demo",
        "type" => "json",
        "url" => "../data/channels.json",
        "status" => "local"
    ]

];

/*
|--------------------------------------------------------------------------
| API Response
|--------------------------------------------------------------------------
*/

echo json_encode([

    "success" => true,

    "project" => "BTECH-TV WORLD ULTRA MAX X",

    "version" => "1.0",

    "server_time" => date("Y-m-d H:i:s"),

    "total_playlists" => count($playlists),

    "playlists" => $playlists

], JSON_PRETTY_PRINT);
