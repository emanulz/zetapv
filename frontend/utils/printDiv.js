export default function PrintElem(elem) {
  const mywindow = window.open('', 'PRINT', 'height=400,width=600')

  mywindow.document.write('<html><head><title>' + document.title + '</title>')
  mywindow.document.write('<link href="/css/posStyles.css" rel="stylesheet">')
  mywindow.document.write('</head><body >')
  mywindow.document.write(document.getElementById(elem).innerHTML)
  mywindow.document.write('</body></html>')

  mywindow.document.close() // necessary for IE >= 10
  mywindow.focus() // necessary for IE >= 10*/

  setTimeout(function() {
    mywindow.print()
    mywindow.close()
  }, 100)

  return true
}
