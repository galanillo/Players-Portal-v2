<!DOCTYPE HTML>
<html>
    <head>
        <title>Registro</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/style.css">
        <link rel="icon" href="images/logo.ico" type="image/png" />
    </head>

    <body>
        <form class="box" action="conexsignup.php" method="POST">
            <br><br><br><br><br><br>
            <h2>Crear cuenta</h2>
            
             <form class="box" action="index.php" method="post">
            <input type="text" name="nick" placeholder="Nick">
            <input type="text" name="nombre" placeholder="Nombre">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Contraseña">
            <input type="password" name="passconf" placeholder="Confirmar contraseña">
    
            <input type="submit" value="Registrar" name="btnRegistrar">   
                 <br><br/>
                <p>Si ya tienes una cuenta, <a href= "login.php"> Logueate</a></p>
                <p>También puedes <a href= "cambiarcontra.php">cambiar tu contraseña</a></p>
            </form>
            
        </form>
    </body>
</html>