const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const uri = 'mongodb+srv://miguelrc055:iLIuzgdyGaBp42ak@cluster0.jouofuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado a MongoDB!');
    // Puedes realizar operaciones con la base de datos aquí
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  } finally {
    await client.close();
  }
}

module.exports =  connectToMongoDB ;
