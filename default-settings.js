// Default Settings System for FCP Audio to XML Website
// This file provides global default settings and initialization

// Default settings configuration
const GLOBAL_DEFAULT_SETTINGS = {
    // Language Settings
    preferredLanguage: 'en',
    
    // Animation Settings
    fadeInDuration: 0.5,
    fadeOutDuration: 0.5,
    fadeInType: 'ease-in-out',
    fadeOutType: 'ease-in-out',
    animationStyle: 'fade',
    animationSpeed: 1,
    blurAmount: 0,
    shadowIntensity: 50,
    
    // Timing Settings
    startTime: 0,
    duration: 5,
    displayMode: 'both',
    previewResolution: '1920x1080',
    frameRate: 25,
    audioSync: 'start',
    autoTiming: true,
    speechSpeed: 'normal',
    sentenceDuration: 4,
    
    // Font and Typography Settings
    englishFont: 'Sinzano',
    englishFontSize: 25,
    englishColor: '#ffffff',
    englishPositionX: 0,
    englishPositionY: -420,
    
    arabicFont: 'Neo Sans Arabic',
    arabicFontSize: 34,
    arabicColor: '#ffffff',
    arabicPositionX: 0,
    arabicPositionY: -381,
    
    // Detection Settings
    detectRepeats: true,
    voiceThreshold: 0.3,
    autoSyncBeats: true,
    beatSensitivity: 0.5,
    
    // UI Settings
    showTutorial: true,
    autoSaveProjects: true,
    confirmBeforeDelete: true,
    showAdvancedOptions: false,
    darkMode: true,
    
    // Audio Settings
    audioQuality: 'high',
    noiseReduction: true,
    volumeNormalization: true,
    
    // Export Settings
    xmlFormat: 'fcpx',
    includeMetadata: true,
    compressOutput: false,
    
    // Library Settings
    maxLibraryFiles: 50,
    autoDeleteOldFiles: false,
    
    // Performance Settings
    enableGPUAcceleration: true,
    maxPreviewQuality: '1080p',
    
    // First time setup
    isFirstTime: true,
    setupCompleted: false
};

// Initialize default settings on first visit or reset
function initializeDefaultSettings() {
    console.log('🔧 Initializing default settings...');
    
    // Check if this is the first time visiting the site
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
        console.log('👋 Welcome! Setting up default configuration...');
        
        // Set all default settings
        Object.keys(GLOBAL_DEFAULT_SETTINGS).forEach(key => {
            const storageKey = getStorageKey(key);
            if (!localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, JSON.stringify(GLOBAL_DEFAULT_SETTINGS[key]));
            }
        });
        
        // Set combined settings objects
        localStorage.setItem('converterSettings', JSON.stringify(getConverterSettings()));
        localStorage.setItem('preferredLanguage', GLOBAL_DEFAULT_SETTINGS.preferredLanguage);
        
        // Mark as visited
        localStorage.setItem('hasVisitedBefore', 'true');
        localStorage.setItem('defaultsInitialized', 'true');
        localStorage.setItem('initializationDate', new Date().toISOString());
        
        console.log('✅ Default settings initialized successfully!');
        return true; // First time visit
    }
    
    // Check if defaults need to be updated (version check)
    const defaultsVersion = localStorage.getItem('defaultsVersion');
    const currentVersion = '1.0.0';
    
    if (defaultsVersion !== currentVersion) {
        console.log('🔄 Updating default settings to version', currentVersion);
        updateDefaultSettings();
        localStorage.setItem('defaultsVersion', currentVersion);
    }
    
    return false; // Not first time
}

// Get storage key for a setting
function getStorageKey(settingKey) {
    const keyMap = {
        preferredLanguage: 'preferredLanguage',
        fadeInDuration: 'converterSettings',
        fadeOutDuration: 'converterSettings',
        // Add more mappings as needed
    };
    
    return keyMap[settingKey] || 'converterSettings';
}

// Get converter-specific default settings
function getConverterSettings() {
    return {
        fadeInDuration: GLOBAL_DEFAULT_SETTINGS.fadeInDuration,
        fadeOutDuration: GLOBAL_DEFAULT_SETTINGS.fadeOutDuration,
        fadeInType: GLOBAL_DEFAULT_SETTINGS.fadeInType,
        fadeOutType: GLOBAL_DEFAULT_SETTINGS.fadeOutType,
        animationStyle: GLOBAL_DEFAULT_SETTINGS.animationStyle,
        animationSpeed: GLOBAL_DEFAULT_SETTINGS.animationSpeed,
        blurAmount: GLOBAL_DEFAULT_SETTINGS.blurAmount,
        shadowIntensity: GLOBAL_DEFAULT_SETTINGS.shadowIntensity,
        startTime: GLOBAL_DEFAULT_SETTINGS.startTime,
        duration: GLOBAL_DEFAULT_SETTINGS.duration,
        displayMode: GLOBAL_DEFAULT_SETTINGS.displayMode,
        previewResolution: GLOBAL_DEFAULT_SETTINGS.previewResolution,
        frameRate: GLOBAL_DEFAULT_SETTINGS.frameRate,
        audioSync: GLOBAL_DEFAULT_SETTINGS.audioSync,
        autoTiming: GLOBAL_DEFAULT_SETTINGS.autoTiming,
        speechSpeed: GLOBAL_DEFAULT_SETTINGS.speechSpeed,
        sentenceDuration: GLOBAL_DEFAULT_SETTINGS.sentenceDuration,
        detectRepeats: GLOBAL_DEFAULT_SETTINGS.detectRepeats,
        voiceThreshold: GLOBAL_DEFAULT_SETTINGS.voiceThreshold,
        autoSyncBeats: GLOBAL_DEFAULT_SETTINGS.autoSyncBeats,
        beatSensitivity: GLOBAL_DEFAULT_SETTINGS.beatSensitivity,
        audioQuality: GLOBAL_DEFAULT_SETTINGS.audioQuality,
        noiseReduction: GLOBAL_DEFAULT_SETTINGS.noiseReduction,
        volumeNormalization: GLOBAL_DEFAULT_SETTINGS.volumeNormalization,
        
        // Font and Typography Settings
        englishFont: GLOBAL_DEFAULT_SETTINGS.englishFont,
        englishFontSize: GLOBAL_DEFAULT_SETTINGS.englishFontSize,
        englishColor: GLOBAL_DEFAULT_SETTINGS.englishColor,
        englishPositionX: GLOBAL_DEFAULT_SETTINGS.englishPositionX,
        englishPositionY: GLOBAL_DEFAULT_SETTINGS.englishPositionY,
        
        arabicFont: GLOBAL_DEFAULT_SETTINGS.arabicFont,
        arabicFontSize: GLOBAL_DEFAULT_SETTINGS.arabicFontSize,
        arabicColor: GLOBAL_DEFAULT_SETTINGS.arabicColor,
        arabicPositionX: GLOBAL_DEFAULT_SETTINGS.arabicPositionX,
        arabicPositionY: GLOBAL_DEFAULT_SETTINGS.arabicPositionY
    };
}

// Update settings when new defaults are available
function updateDefaultSettings() {
    const existingSettings = JSON.parse(localStorage.getItem('converterSettings') || '{}');
    const updatedSettings = { ...getConverterSettings(), ...existingSettings };
    localStorage.setItem('converterSettings', JSON.stringify(updatedSettings));
}

// Get a setting value with fallback to default
function getSetting(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        if (value === null) {
            return defaultValue !== null ? defaultValue : GLOBAL_DEFAULT_SETTINGS[key];
        }
        return JSON.parse(value);
    } catch (error) {
        console.warn(`Error getting setting ${key}:`, error);
        return defaultValue !== null ? defaultValue : GLOBAL_DEFAULT_SETTINGS[key];
    }
}

// Set a setting value
function setSetting(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`Setting ${key} updated:`, value);
    } catch (error) {
        console.error(`Error setting ${key}:`, error);
    }
}

// Reset all settings to defaults
function resetToDefaults() {
    console.log('🔄 Resetting all settings to defaults...');
    
    // Clear all existing settings
    const keysToKeep = ['hasVisitedBefore', 'defaultsInitialized', 'initializationDate'];
    Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    });
    
    // Reinitialize defaults
    initializeDefaultSettings();
    
    console.log('✅ All settings reset to defaults');
    
    // Reload page to apply changes
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
}

// Export settings for backup
function exportSettings() {
    const allSettings = {};
    Object.keys(localStorage).forEach(key => {
        try {
            allSettings[key] = JSON.parse(localStorage.getItem(key));
        } catch {
            allSettings[key] = localStorage.getItem(key);
        }
    });
    
    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fcp-converter-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('📁 Settings exported successfully');
}

// Import settings from backup
function importSettings(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            
            // Validate and import settings
            Object.keys(settings).forEach(key => {
                localStorage.setItem(key, typeof settings[key] === 'string' ? settings[key] : JSON.stringify(settings[key]));
            });
            
            console.log('📥 Settings imported successfully');
            
            // Reload page to apply changes
            if (typeof window !== 'undefined') {
                alert('Settings imported successfully! The page will reload to apply changes.');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error importing settings:', error);
            if (typeof window !== 'undefined') {
                alert('Error importing settings. Please check the file format.');
            }
        }
    };
    reader.readAsText(file);
}

// Show first-time welcome message
function showWelcomeMessage() {
    if (getSetting('isFirstTime', true)) {
        console.log('👋 Welcome to FCP Audio to XML Converter!');
        
        // Only show alert if in browser environment
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const isArabic = getSetting('preferredLanguage') === 'ar';
            const message = isArabic 
                ? 'مرحباً بك في محول الصوت إلى XML!\n\nتم تطبيق الإعدادات الافتراضية المحسنة:\n• اللغة الافتراضية: الإنجليزية\n• خط الإنجليزية: Sinzano (حجم 25)\n• خط العربية: Neo Sans Arabic (حجم 34)\n• المواضع والألوان محسّنة\n\nيمكنك تغيير هذه الإعدادات من صفحة الإعدادات.'
                : 'Welcome to FCP Audio to XML Converter!\n\nOptimized default settings have been applied:\n• Default Language: English\n• English Font: Sinzano (Size 25)\n• Arabic Font: Neo Sans Arabic (Size 34)\n• Positions and colors optimized\n\nYou can change these settings from the Settings page.';
            
            // Show a subtle notification instead of alert
            setTimeout(() => {
                showNotification(message, 'success', 7000);
            }, 1000);
        }
        
        // Mark as no longer first time
        setSetting('isFirstTime', false);
    }
}

// Notification system (if not already available)
function showNotification(message, type = 'success', duration = 3000) {
    if (typeof document === 'undefined') return;
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.global-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `global-notification notification ${type} show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Cairo', 'Inter', sans-serif;
        line-height: 1.4;
        white-space: pre-line;
    `;
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #34d399)',
        error: 'linear-gradient(135deg, #ef4444, #f87171)',
        warning: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        info: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    };
    notification.style.background = colors[type] || colors.info;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Auto-initialize when script loads
if (typeof document !== 'undefined') {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const isFirstTime = initializeDefaultSettings();
            if (isFirstTime) {
                setTimeout(showWelcomeMessage, 2000);
            }
        });
    } else {
        // DOM is already ready
        const isFirstTime = initializeDefaultSettings();
        if (isFirstTime) {
            setTimeout(showWelcomeMessage, 2000);
        }
    }
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.GLOBAL_DEFAULT_SETTINGS = GLOBAL_DEFAULT_SETTINGS;
    window.initializeDefaultSettings = initializeDefaultSettings;
    window.getSetting = getSetting;
    window.setSetting = setSetting;
    window.resetToDefaults = resetToDefaults;
    window.exportSettings = exportSettings;
    window.importSettings = importSettings;
    window.showWelcomeMessage = showWelcomeMessage;
    window.getConverterSettings = getConverterSettings;
    
    console.log('🌐 Global settings system loaded successfully');
}
