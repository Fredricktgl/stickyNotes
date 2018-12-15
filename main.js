fetchNotes = () => {
  document.getElementById('noteInputForm').addEventListener('submit', saveNote);

  const searchNotes = JSON.parse(localStorage.getItem('searchNotes'))
  const notes = JSON.parse(localStorage.getItem('notes'));
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  if (searchNotes === 'empty'){
    notesList.innerHTML += '<div> Search has returned no results </div>'
  } else {
    let renderedNotes
    searchNotes.length !==0 ? renderedNotes = searchNotes : renderedNotes = notes
  
    for (let i=0; i < renderedNotes.length; i++){
      let title = renderedNotes[i].title
      let desc = renderedNotes[i].description

      notesList.innerHTML += '<div>' + 
                                '<h5>' + title + '</h5>' +
                                '<div>' + desc + '</div>' +
                                '<div>' + 
                                    '<a href="#openModal"><button onclick="editNote('+ i +')">Edit</button></a>' + 
                                    '<button onclick="deleteNote('+ i +')"> Delete </button>' +
                                '</div>'
                              '</div>'
    }
  }  
}

saveNote = (e) => {
  const title = document.getElementById('titleInput').value
  const description = document.getElementById('descriptionInput').value
  const note = {
    title: title,
    description: description
  }   

  let notes
  localStorage.getItem('notes') === null ? notes = [] : notes = JSON.parse(localStorage.getItem('notes'));
  notes.push(note)
  localStorage.setItem('notes', JSON.stringify(notes))
  localStorage.setItem('searchNotes', JSON.stringify([]))


  document.getElementById('noteInputForm').reset();
  fetchNotes()
  e.preventDefault();
}

editNote = (id) => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  const modalContent = document.getElementById('modalContent');

  modalContent.innerHTML ='<form id="noteEditForm">' +
                            '<div>' +
                              '<label>Title: </label>' +
                              '<input type="text" id="editTitleInput" placeholder="'+notes[id].title+'">' +
                            '</div>' +

                            '<div>' +
                              '<label>Description: </label>' +
                              '<input type="text" id="editDescriptionInput" placeholder="'+notes[id].description+'">' +
                            '</div>' +

                            '<button><a href="#close" onclick="saveEditNote('+ id +')">Edit</a></button>'
                          '</form>'
}

saveEditNote = (id) => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  const editTitle = document.getElementById('editTitleInput').value
  const editDesc = document.getElementById('editDescriptionInput').value

  if (editTitle === "" && editDesc === ""){
    console.log('prompt user to fill in 1 field')
  } else {

    for (let i=0; i < notes.length; i++){
      if (id === i){
        if (editTitle !== ""){ notes[i].title = editTitle }
        if (editDesc !== ""){ notes[i].description = editDesc }
      }
    }

    localStorage.setItem('notes', JSON.stringify(notes))
  }

  document.getElementById('noteEditForm').reset();
  fetchNotes();
}

deleteNote = (id) => {
  let notes = JSON.parse(localStorage.getItem('notes'));

  for (let i=0; i < notes.length; i++){
    if (i === id){
      notes.splice(i, 1);
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  fetchNotes();
}

searchTitles = () => {
  let notes = JSON.parse(localStorage.getItem('notes'));
  let searchTitles = document.getElementById("search").value

  let finder = notes.filter(find => {
    return find.title.includes(searchTitles)
  })
  
  if (finder.length !==0){
    localStorage.setItem('searchNotes', JSON.stringify(finder))
  } else {
    searchTitles.length !==0 ? localStorage.setItem('searchNotes', JSON.stringify('empty')) : localStorage.setItem('searchNotes', JSON.stringify([]))
  }

  fetchNotes();
}