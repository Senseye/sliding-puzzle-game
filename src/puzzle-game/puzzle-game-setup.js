import { Subject, Observable } from 'rxjs';

export class PuzzleGameSetup {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.form = this.element.querySelector('form');
    this.imageElement = document.getElementById('imagePreview');
    this.bindEvents();
    this.subject = new Subject();
  }

  previewImage() {
    const image = this.element.querySelector('[name=imageSrc]').value;
    this.imageElement.setAttribute('src', image);
  }

  bindEvents() {
    const formSubmit = Observable.fromEvent(this.element, 'submit');
    const formChange = Observable.fromEvent(this.element, 'change');

    formSubmit.subscribe((event) => {
      event.preventDefault();
      const { target } = event;
      const data = {
        gridSize: Number(target.querySelector('[name=gridSize]').value),
        imageSrc: target.querySelector('[name=imageSrc]').value,
        imageSize: document.getElementById('imagePreview').width,
      };
      this.element.classList.add('d-none');
      this.subject.next(data);
    });

    formChange
      .filter(event => event.target.getAttribute('name') === 'imageSrc')
      .subscribe(() => this.previewImage());
  }
}

export function createPuzzleGameSetup(elementId) {
  return new PuzzleGameSetup(elementId);
}
