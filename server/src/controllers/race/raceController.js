const razas = [
	{
		"Race_id" : 1,
		"Name" : "Wizard",
        "Max_life" : 50

	},
	{
		"Race_id" : 2,
		"Name" : "Elf",
         "Max_life" : 45
		
	},
	{
		"Race_id" : 3,
		"Name" : "Human",
         "Max_life" : 30
	},
	{
		"Race_id" : 4,
		"Name" : "Hobbit",
         "Max_life" : 20
	
    },
    {
		"Race_id" : 5,
		"Name" : "Dwarf",
         "Max_life" : 25
	
	}

]
async function getAll(){
    return {data:razas};
    //return "Mostramos todos los razas";
}

async function getById(id){
    const race = razas.find(race=>race.Race_id === id);
    if (!race){
        return {error: "El personaje no exite"};
    }
    return{data:race};

    //return `Mostramos el personaje con id ${id}`;
}
async function create(userData){
    const {Name, Max_life} = userData;
    if(!Name){
        return{error: "los razas tienen que tener nombre"};
    }
    const maxId = Math.max(...razas.map(race => race.Race_id));
    const newId = maxId +1;
    const newRace ={
        Race_id:newId,
        Name,
        Max_life,
    }
    razas.push(newRace);
    return{data:newRace};

   // return `Los datos para el personaje nuevo son: nombre:${Name}, raza: ${Race}, id del arma : ${Hostile}, mapa ${Race_id}`;
}
async function update(id,userData){
    const {Name, Max_life} = userData;
    const race= razas.find(race=>race.Race_id === id);
    if (!race){
        return {error: "El personaje no se puede modificar, no existe"};
    }
    if(Name){
        race.Name = Name;
    }
    if(Max_life){
        race.Race_id = Race_id
    }
    return{data:race};

    //return `Los nuevos datos para el personaje con id ${id} son: nombre:${Name}, raza: ${Race}, id del arma : ${Hostile}, mapa ${Race_id}`;
}

async function remove(id){
    const raceIndex = razas.findIndex(race=>race.Race_id === id);
    if( raceIndex === -1){
        return {error: "No se puede borrar el personaje que no existe"}
    }
    const deleteRace = razas.splice(raceIndex,1);
    return {data:deleteRace};
   // return `Borramos el personaje con id ${id}`;
}

export {
    getAll,
    getById,
    create,
    update,
    remove
};


export default {
    getAll,
    getById,
    create,
    update,
    remove
};