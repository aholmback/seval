import $ from 'jquery'
import './manifest.json'

$('[data-src]').each((index, element) => {
  $(element).attr('src', $(element).data('src'))
})
