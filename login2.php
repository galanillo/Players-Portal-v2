<!DOCTYPE HTML>
<html>
    <head>
        <title>Login</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="icon" href="images/logo.ico" type="image/png" />
    </head>

    <body>
        <form class="box" action="conexion.php" method="POST" >
            <br><br><br><br><br><br>
            <h2>Inicio de sesión</h2>
            
            <form class="box" action="index.php" method="post">
            <input type="text" name="nick" placeholder="Nombre de usuario">
            <input type="password" name="password" placeholder="Contraseña">
            <input type="submit" name="btnEntrar" value="Login">
      
            <p class="credenciales">Creedenciales no validas</p>
            <p> Si no esta registrado, <a href= "signup.php"> Registrate</a></p>
            <p>También puedes <a href= "cambiarcontra.php">cambiar tu contraseña</a></p>
            </form>
              
        </form>
    </body>
</html>