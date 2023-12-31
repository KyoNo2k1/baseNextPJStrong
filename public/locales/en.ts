const EnglishScript = {
  common: {
    slogan: 'REACH FURTHER',
    en: 'English',
    vi: 'Vietnamese',
    appName: 'VNA',
    save: 'Save',
    progressFeature: 'Feature is in progress!',
    close: 'Close',
    confirm: 'Confirm',
    create: 'Create',
    logout: 'Do you want to logout?',
    delete: 'Delete',
    result: 'Results',
    sort: 'Sort',
    availableCreditLimit: 'Available credit limit',
    under: 'under',
    hrs: 'hrs',
    day: 'day',
    deleteSpecific: (name: String) => `Delete ${name}`,
    edit: 'Edit',
    search: 'Search',
    select: 'Select',
    clear: 'Clear',
    latest: 'Latest',
    oldest: 'Oldest',
    detail: 'Detail',
    freeOfChange: 'Free of change',
    notAllow: 'Not Allow',
    chargeable: 'Chargeable',
    filterMore: 'Filter more',
    changeStatus: 'Change status',
    deleteMarket: 'Delete market',
    deleteAgent: 'Delete agent',
    updateFilter: 'Update filter',
    descChangeStatus: 'Do you want to change status?',
    gobackHome: 'Go back home',
    next: 'Next',
    back: 'Back',
    continue: 'Continue',
    reset: 'Reset',
    loadMore: 'Load more',
    loadLess: 'Show less',
    showing: 'Showing',
    of: 'of',
    elements: 'elements',
    notification: 'Notification',
    no: 'No',
    yes: 'Yes',
    cancel: 'Cancel',
    add: 'Add',
    export: {
      _: 'Export',
      all: 'All',
      currentPage: 'CurrentPage',
      currentSelect: 'Selection',
    },
    notify: {
      warningDelete: (name: string) => `Are you sure to delete this ${name}?`,
      warningChangeStatus: (name: string) => `Are you sure to change the status of this ${name}?`,
      createSuccess: (name: string) => `Create ${name} successfully`,
      createFail: (name: string) => `Create ${name} fail, please try later`,
      deleteSuccess: (name: string) => `Delete ${name} successfully`,
      deleteFail: (name: string) => `Delete ${name} fail, please try later`,
      editSuccess: (name: string) => `Edit ${name} successfully`,
      editFail: (name: string) => `Edit ${name} fail, please try later`,
      changeStatusSuccess: 'Change status successfully',
      changeStatusFail: 'Change status fail',
      resetPassSuccess: 'Reset password successfully',
      blockDes: 'Account has been blocked, please contact admin to change password!',
      blockTitle: 'Account has been blocked!',
      resetPassFail: 'Reset password failed',
      discard: 'Discard all the content?',
      forceBack: 'All the fields will not be saved. You will be taken back to the previous page.',
      priceChanged: 'The price of the flight has changed!',
      priceChangedDetail: (priceBefore: string, priceAfter: string) =>
        `Total price has been updated from ${priceBefore} to ${priceAfter}. Please check the price check price details before you proceed.`,
      expiring: 'Your session is about to expire',
      expiringDetail: 'To prevent it from expiring, click the button below',
      expired: 'Your session has expired',
      expiredDetail: 'To start over, click the button bellow',
      exit: 'Do you sure you want to exit? Your data will be lost.',
      submitFail: 'Something went wrong',
      submitFailDetail:
        'There may be an issue with your request. Please try again or contact our support if you need a hand',
    },
    form: {
      require: "You haven't filled out all mandatory fields",
      minChar: 'Must be equal or more than 8 characters',
      minAmountChar: (amount: number) => `Must be equal or more than ${amount} characters`,
      maxAmountChar: (amount: number) => `Must be less than ${amount} characters`,
      invalidPhone: 'Phone number format is invalid!',
      invalidEmail: 'Email format is invalid',
      invalidLength: 'Invalid length!',
      invalidAmount: 'Invalid amount!',
    },
    showElements: (page: number, total: number) => `Showing ${page} of ${total} elements`,
    tabClose: {
      currentTab: 'Close current tab',
      otherTab: 'Close other tab',
      allTab: 'Close all tab',
    },
    createAt: 'Create at',
    createBy: 'Create by',
    updateAt: 'Update at',
    updateAtFrom: 'Update at from',
    updateAtTo: 'Update at to',
    updateBy: 'Update by',
    action: 'Action',
    status: 'Status',
    orgStatus: 'Organization status',
    active: 'Active',
    deActive: 'Deactive',
    show: 'show',
    hide: 'hide',
    history: 'History',
    startDate: 'Start date',
    endDate: 'End date',
    listFilter: 'List filter',
    deleteFilter: 'Delete filter',
    selectAll: 'Select All',
    all: 'All',
    notHaveActiveMarket: 'Not have active Market',
    loading: 'Loading...',
    byClickingOn: 'By clicking on',
    showLess: 'Show less',
    startOver: 'Start over',
  },
  menu: {
    header: {
      AccountBalance: 'Account Balance',
      AccountInfo: 'Account Info',
      AvailableBalance: 'Available Balance',
      ChangePass: 'Change Password',
      Logout: 'Logout',
    },
    userManagement: 'User Management',
    group: 'Group',
    team: 'Team',
    users: 'Users',
    pdone: 'PDone',
    pdoneApprovement: 'Pdone Approvement',
    ja: 'JA',
    jaApprovement: 'JA Approvement',
    marshop: 'Marshop',
    marshopApprovement: 'Marshop Aprrovement',
    home: 'Home',
    profile: 'Profile',
    term: 'GDPR and Conditions of carriage',
    userGuide: 'User Guide',
  },
  page: {
    profile: 'My Profile',
    404: {
      pageTitle: 'Page Not Found',
    },
    403: {
      pageTitle: 'Page Not Authorize',
    },
    500: {
      pageTitle: 'Server Error',
    },
    team: {
      _: 'Team',
    },
    auth: {
      forgotPass: 'Forgot password',
      descForgotPass:
        'Enter your username or email address and we will send you instructions on how to create a new password.',
      emailMe: 'Email me',
      resetPass: 'Reset password',
      desResetPass:
        'This is the first time you have logged into Travel Agent Portal. Please change your password to protect your account before using the system!',
      newPass: 'New password',
      change: 'Change',
      changeYourPass: 'Change your password',
      changePassSuccess: 'Change password successfully',
      changePassFail: 'Change password fail',
      createPassSuccess: 'Create password successfully',
      createPassFail: 'Create password fail',
      loginFail: 'Login fail',
      loginSuccess: 'Login successfully',
      logoutFail: 'Logout fail, try again',
      createPass: 'Create your password',
      desCreatePass:
        'This is the first time you have logged into Travel Agent Portal. Please create your password to login for the next time before using the system!',
    },
    login: {
      _: 'Welcome to Admin Management',
      userName: 'Username',
      pass: 'Password',
      remember: 'Remember',
      forgotPass: 'Forgot password?',
      captcha: 'Type the word above',
      incorrectCaptcha: 'Incorrect captcha',
      submit: 'Submit',
      copyright: 'Copyright',
      description:
        "Being a dynamic, modern international airline with Vietnam's cultural identity, for more than 20 years of development with double-digit growth, Vietnam Airlines has been leading the Vietnam aviation market - one of the world's fastest-growing domestic markets. As a widely known modern airline brand name with a unique culture, Vietnam Airlines aims to become a leading 5-star international airline in Asia.",
      messageLoginFail: 'Accounts that have been locked need to contact the administrator to reset the password.',
    },
  },
};
export default EnglishScript;
