module.exports = (sequelize, type) => {
    return sequelize.define('Agent', {
      ProjectId: {
        type: type.STRING,
        primaryKey: true,
        autoIncrement: false,
        unique: true
      },
        
        displayName:{
          type : type.STRING
        }
    })

}