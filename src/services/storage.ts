import { 
  Destination, 
  NewsArticle, 
  GalleryItem, 
  PermitApplication, 
  DepartmentProfile 
} from '../types';
import { 
  INITIAL_DESTINATIONS, 
  INITIAL_NEWS, 
  INITIAL_GALLERY, 
  INITIAL_APPLICATIONS, 
  DEPARTMENT_PROFILE 
} from '../data/initialData';

const STORAGE_KEYS = {
  DESTINATIONS: 'disporapar_hsu_destinations_v1',
  NEWS: 'disporapar_hsu_news_v1',
  GALLERY: 'disporapar_hsu_gallery_v1',
  APPLICATIONS: 'disporapar_hsu_applications_v1',
  PROFILE: 'disporapar_hsu_profile_v1'
};

export const getStoredDestinations = (): Destination[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(INITIAL_DESTINATIONS));
      return INITIAL_DESTINATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DESTINATIONS;
  }
};

export const saveDestinations = (destinations: Destination[]): void => {
  localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
};

export const getStoredNews = (): NewsArticle[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NEWS;
  }
};

export const saveNews = (news: NewsArticle[]): void => {
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
};

export const getStoredGallery = (): GalleryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_GALLERY;
  }
};

export const saveGallery = (gallery: GalleryItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
};

export const getStoredApplications = (): PermitApplication[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPLICATIONS;
  }
};

export const saveApplications = (apps: PermitApplication[]): void => {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
};

export const getStoredProfile = (): DepartmentProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEPARTMENT_PROFILE));
      return DEPARTMENT_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEPARTMENT_PROFILE;
  }
};

export const saveProfile = (profile: DepartmentProfile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const resetToDefaultData = (): void => {
  localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(INITIAL_DESTINATIONS));
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEPARTMENT_PROFILE));
};
