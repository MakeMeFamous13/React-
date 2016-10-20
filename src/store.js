'use strict';

import { createStore, combineReducers } from 'redux';

const systemInitial = {
    internet: null,
    flashConnected: null,
    flashKey: null,
    user: {},
    sound: false
};

const sectionInitial = {
    prevPopup: null,
    popup: null
};

const menuInitial = {
    contextMenu: null,
};

const subjectsInitial = {
    list: [],
};

const classesInitial = {};

const lessonsInitial = {
    list: [],
    available: [],
    current: [],
};

const libraryInitial = {
    list: [],
    current: []
};

const initializePageInitial = {
    page: ''
};

const lessonViewerInitial = {
    list: []
};

const initialState = [
    {
        system: systemInitial,
        section: sectionInitial,
        initializePage: initializePageInitial,

        menu: menuInitial,
        subjects: subjectsInitial,
        classes: classesInitial,
        lessons: lessonsInitial,
        library: libraryInitial,
        lessonViewer: lessonViewerInitial,
    }
];

const SystemReducer = (state = systemInitial, action) => {
    switch (action.type) {
        case 'SYSTEM_NO_INTERNET':
            return { ...state, internet: false };
        case 'SYSTEM_YES_INTERNET':
            return { ...state, internet: true };
        case 'SYSTEM_NO_FLASH':
            return { ...state, flashConnected: false };
        case 'SYSTEM_YES_FLASH':
            return { ...state, flashConnected: true };
        case 'SYSTEM_CHANGE_FLASH_KEY':
            return { ...state, flashKey: action.key };
        case 'SYSTEM_CHANGE_SOUND':
            return { ...state, sound: action.sound };
        case 'USER_LOGIN':
            return { ...state, user: action.user };
        case 'USER_LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
};

const SectionPageReducer = (state = sectionInitial, action) => {
    switch (action.type) {
        case 'POPUP_HIDE':
            return { ...state, popup: state.prevPopup, prevPopup: null };
        case 'POPUP_FLASH':
            return { ...state, popup: 'FlashConnection', prevPopup: state.popup };
        case 'POPUP_INTERNET':
            return { ...state, popup: 'InternetConnection', prevPopup: state.popup };
        case 'POPUP_TUTORIAL_SHOW':
            return { ...state, popup: 'InstructionRemote' };
        case 'POPUP_VIDEO_SHOW':
            return { ...state, popup: 'TutorialVideo' };
        case 'POPUP_FLASH_RECONNECT_SHOW':
            return { ...state, popup: 'FlashReconnect' };
        case 'POPUP_STUDY_SYSTEM_SHOW':
            return { ...state, popup: 'StudySystem' };
        case 'POPUP_SOUND_SHOW':
            return { ...state, popup: 'SoundControl' };
        case 'POPUP_UPDATE':
            return { ...state, popup: 'Update' };
        case 'STUDY_FINISHED':
            return { ...state, studyFinished: action.value };
        case 'RECONNECT_FINISHED':
            return { ...state, reconnectFinished: true };
        default:
            return state;
    }
};

const InitializePageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_START_PAGE':
            return { ...state, page: action.page };
        default:
            return state;
    }
};

const MenuPageReducer = (state = menuInitial, action) => {
    switch (action.type) {
        case 'SHOW_CONTEXT_MENU':
            return { ...state, contextMenu: true };
        case 'HIDE_CONTEXT_MENU':
            return { ...state, contextMenu: false };
        case 'CLOSE_CONTEXT_MENU':
            return { ...state, contextMenu: null };
        default:
            return state;
    }
};

const SubjectsReducer = (state = subjectsInitial, action) => {
    switch (action.type) {
        case 'SUBJECTS_LOAD':
            return { ...state, list: action.list };
        case 'CONTENTS_UPDATED':
            return { ...state, list: subjectsInitial.list };
        default:
            return state;
    }
};

const ClassesReducer = (state = classesInitial, action) => {
    switch (action.type) {
        case 'CLASSES_LOAD':
            return { ...state, [action.subjectId]: action.list };
        case 'CONTENTS_UPDATED':
            return { ...state, classesInitial: state.list };
        default:
            return state;
    }
};

const LessonsReducer = (state = lessonsInitial, action) => {
    switch (action.type) {
        case 'LESSONS_LOAD':
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.subjectId]: {
                        ...state.list[action.subjectId],
                        [action.classId]: action.list
                    }
                }
            };
        case 'CONTENTS_UPDATED':
            return { ...state, list: lessonsInitial.list };
        case 'LOAD_LESSON':
            return { ...state, current: action.lesson };
        default:
            return state;
    }
};

const LibraryReducer = (state = libraryInitial, action) => {
    switch (action.type) {
        case 'LIBRARY_LOAD':
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.subjectId]: {
                        ...state.list[action.subjectId],
                        [action.classId]: action.list
                    }
                }
            };
        case 'CONTENTS_UPDATED':
            return { ...state, list: libraryInitial.list };
        case 'LOAD_LIBRARY_LESSON':
            return { ...state, current: action.lesson };
        default:
            return state;
    }
};

const LessonViewerReducer = (state = lessonViewerInitial, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        system: SystemReducer,
        section: SectionPageReducer,
        initializePage: InitializePageReducer,
        menu: MenuPageReducer,
        subjects: SubjectsReducer,
        classes: ClassesReducer,
        lessons: LessonsReducer,
        library: LibraryReducer,
        lessonViewer: LessonViewerReducer,
    }),
    initialState,
    window.devToolsExtension && window.devToolsExtension()
);

export default store;
