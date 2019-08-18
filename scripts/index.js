'use strict';

const data = [{"id": 0,"urgency": "I got time","text": "With an timeline set up, our expert will forget about deadlines and provide good result."},{"id": 1,"urgency": "average","text": "With an timeline set up, our expert translator can take a reasonable amount of time perfecting your translation"},{"id": 2,"urgency": "yesterday","text": "With an timeline set up, our expert will hire assistants and provide you translated documents in a couple of hours."}];
const fileInfoTemplate = document.getElementsByClassName('file-info')[0].cloneNode(true);
let uploadedFiles = document.getElementById('form-upload-input');
let fileInfo = document.getElementsByClassName('file-info');
let fileInfoContainer = document.getElementsByClassName('table-body')[0];
let deleteFiles = document.getElementsByClassName('remove-button');
let urgencySlider = document.getElementById('urgency-slider');
let urgencyLabelPoint = document.getElementsByClassName('label-point');
let urgencyInfo = document.getElementsByClassName('info-text');

uploadedFiles.addEventListener('change', fileHandler);
for (let i = 0; i < deleteFiles.length; i++) {
    deleteFiles[i].addEventListener('click', deleteFile);
}
urgencySlider.addEventListener('change', changeTimeline);

function fileHandler() {
    let newFileInfo = fileInfoTemplate.cloneNode(true);
    let fileName = newFileInfo.getElementsByClassName('file-name');
    let fileSize = newFileInfo.getElementsByClassName('file-info-size');
    let fileWords = newFileInfo.getElementsByClassName('file-info-words');

    fileInfoContainer.appendChild(newFileInfo);
    fileName[0].innerHTML = this.files[0].name;
    fileSize[0].innerHTML = Math.round(this.files[0].size/1024) + "kb";
    fileWords[0].innerHTML = Math.round(Math.random() * (1000 - 100) + 100);

    newFileInfo.getElementsByClassName('remove-button')[0].addEventListener('click', deleteFile);
}

function deleteFile() {
    this.parentNode.parentNode.remove();
}

function changeTimeline() {
    let urgencyTexts = JSON.stringify(data);
    urgencyTexts = JSON.parse(urgencyTexts);
    switch (parseInt(this.value)) {
        case 0:
        case 1:
        case 2:
            let arr = urgencyTexts[this.value].text.split(' ');
            let urgency = urgencyTexts[this.value].urgency;
            let orangeWord = `<span class="label-text-main orange-text">${urgency}</span>`;
            arr.splice(2, 0, orangeWord);
            urgencyInfo[0].innerHTML = arr.join(' ');
            for (let i = 0; i < urgencyLabelPoint.length; i++) {
                urgencyLabelPoint[i].classList.contains('orange-text') ? urgencyLabelPoint[i].classList.remove('orange-text') : false;
            }
            urgencyLabelPoint[this.value].classList.add('orange-text');
    }
}
