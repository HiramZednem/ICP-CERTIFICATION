import React from 'react';

const NotConnected = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-500 border-l-4 border-red-700 text-white p-4 rounded-md shadow-md" role="alert">
        <p className="font-bold">¡Conecta tu wallet para continuar!</p>
        <p>Algunas funcionalidades pueden requerir la conexión de tu wallet.</p>
      </div>
    </div>
  );
};

export default NotConnected;
