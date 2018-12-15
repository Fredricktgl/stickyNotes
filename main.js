fetchNotes = () => {
  document.getElementById('noteInputForm').addEventListener('submit', saveNote);

  const searchNotes = JSON.parse(localStorage.getItem('searchNotes'))
  const notes = JSON.parse(localStorage.getItem('notes'));
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  if (searchNotes === 'empty'){
    notesList.innerHTML += '<div> Search has returned no results </div>'
  } else if (notes === null || notes.length === 0){
    notesList.innerHTML += '<div> No content found</div>'
  } else {
    let renderedNotes
    searchNotes.length !==0 ? renderedNotes = searchNotes : renderedNotes = notes

    for (let i=0; i < renderedNotes.length; i++){
      let id = renderedNotes[i].id
      let title = renderedNotes[i].title
      let desc = renderedNotes[i].description

      notesList.innerHTML += '<div>' + 
                                '<h3>' + title + '</h3>' +
                                '<div class="content-desc">' + desc + '</div>' +
                                '<div class="content-btn-row">' + 
                                    '<a href="#openModal"><button class="content-btn-edit" onclick="editNote('+ id +')">Edit</button></a>' + 
                                    '<button class="content-btn-del" onclick="deleteNote('+ id +')"> Delete </button>' +
                                '</div>'
                              '</div>'
    }
  }  
}

saveNote = (e) => {
  const title = document.getElementById('titleInput').value
  const description = document.getElementById('descriptionInput').value
  const allNotes = JSON.parse(localStorage.getItem('notes'))

  console.log(allNotes)
  let uniqueId
  let findId
  let i = 0

  if (allNotes === null){
    uniqueId = 0
  } else {
    while (true){
      findId = JSON.parse(localStorage.getItem('notes')).find(note => { return note.id === i })
      if (!findId){
        uniqueId = i
        break
      }
      i++
    }
  }

  const note = {
    id: uniqueId,
    title: title,
    description: description
  }   

  let notes
  localStorage.getItem('notes') === null ? notes = [] : notes = JSON.parse(localStorage.getItem('notes'));
  notes.push(note)
  localStorage.setItem('notes', JSON.stringify(notes))
  localStorage.setItem('searchNotes', JSON.stringify([]))

  console.log(notes)
  document.getElementById('noteInputForm').reset();

  fetchNotes()
  e.preventDefault();
}

editNote = (id) => {
  const allNotes = JSON.parse(localStorage.getItem('notes'));
  const modalContent = document.getElementById('modalContent');

  const note = allNotes.find(note => {
    return note.id === id
  })

  modalContent.innerHTML ='<form id="noteEditForm">' +
                            '<div class="row">' +
                              '<div class="col-12 col-s-12 label"><h3>Currently editing a content</h3></div>' +
                            '</div>' +
                            '<div class="row">' +
                              '<div class="col-2 col-s-2 label"><label>Title</label></div>' +
                              '<div class="col-10 col-s-10"><input type="text" id="editTitleInput" placeholder="'+note.title+'"></div>' +
                            '</div>' +
                            '<div class="row">' +
                              '<div class="col-2 col-s-2 label"><label>Content</label></div>' +
                              '<div class="col-10 col-s-10"><input type="text" id="editDescriptionInput" placeholder="'+note.description+'"></div>' +
                            '</div>' +
                            '<div class="row">' +
                              '<div class="col-12 col-s-12"><a class="editButton" onclick="saveEditNote('+ note.id +')">Edit content</a></div>' +
                            '</div>'
                          '</form>'
}

saveEditNote = (id) => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  const editTitle = document.getElementById('editTitleInput').value
  const editDesc = document.getElementById('editDescriptionInput').value
  
  if (editTitle === "" && editDesc === ""){
    alert('Title and content not filled, please ensure that at least one field is filled for update');
  } else {
    for (let i=0; i < notes.length; i++){
      if (id === i){
        if (editTitle !== ""){ notes[i].title = editTitle }
        if (editDesc !== ""){ notes[i].description = editDesc }

        alert('Content successfully updated!')
        window.location = "#close"
        break
      }
    }

    localStorage.setItem('notes', JSON.stringify(notes))
  }

  document.getElementById('noteEditForm').reset();
  localStorage.setItem('searchNotes', JSON.stringify([]))
  fetchNotes();
}

deleteNote = (id) => {
  let notes = JSON.parse(localStorage.getItem('notes'));

  for (let i=0; i < notes.length; i++){
    if (notes[i].id === id){
      notes.splice(i, 1);
    }
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  localStorage.setItem('searchNotes', JSON.stringify([]))
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