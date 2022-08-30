const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const googleStore = "https://play.google.com/store/apps/details?id=com.mobfiq.babadotop";
  const appleStore = "https://apps.apple.com/us/app/babadotop-moda-feminina/id1588786663";

  if (/android/i.test(userAgent)) {
      return googleStore;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return appleStore;
  }

  return googleStore;
}

export default getMobileOperatingSystem;
