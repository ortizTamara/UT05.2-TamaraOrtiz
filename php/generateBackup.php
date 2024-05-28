<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['backup'])) {
     
        $backup = $_POST['backup'];

    
        $carpetaBackup = "./data/backup/";


        if (!file_exists($carpetaBackup)) {
            mkdir($carpetaBackup, 0777, true);
        }


        $fechaActual = date("Ymd_His");
        $nombreArchivo = $carpetaBackup . "backup_" . $fechaActual . ".json";


        file_put_contents($nombreArchivo, $backup);

    
        $response = [
            "success" => true,
            "message" => "Backup guardado correctamente en: " . $nombreArchivo,
            "backup" => $backup
        ];
    } else {
   
        $response = [
            "success" => false,
            "message" => "No se encontró el campo 'backup' en la solicitud"
        ];
    }
} else {

    $response = [
        "success" => false,
        "message" => "La solicitud debe ser de tipo POST"
    ];
}


header('Content-Type: application/json');
echo json_encode($response);
?>