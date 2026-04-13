import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';

const COLORS = {
  primary: '#53B175',
  text: '#181725',
  subText: '#7C7C7C',
  border: '#E2E2E2',
  bg: '#FFFFFF',
  inputBg: '#F2F3F2',
  screenBg: '#FCFCFC',
  lightGreen: '#EAF7EE',
};

const IMAGES = {
  logo: require('./assets/placeholders/logo_carrot.png'),
  onboarding: require('./assets/placeholders/onboarding_bg.png'),
  signInHero: require('./assets/placeholders/signin_hero.png'),
  map: require('./assets/placeholders/map_placeholder.png'),
  banner: require('./assets/placeholders/banner_grocery.png'),
};

const categories = [
  {
    id: 'c1',
    title: 'Fresh Fruits\n& Vegetable',
    image: require('./assets/placeholders/category_fruits.png'),
    bg: '#EEF7F1',
    border: '#B4E1C3',
  },
  {
    id: 'c2',
    title: 'Cooking Oil\n& Ghee',
    image: require('./assets/placeholders/category_oil.png'),
    bg: '#FFF6EB',
    border: '#F6D1A8',
  },
  {
    id: 'c3',
    title: 'Meat & Fish',
    image: require('./assets/placeholders/category_meat.png'),
    bg: '#FDEEEF',
    border: '#F1C3C8',
  },
  {
    id: 'c4',
    title: 'Bakery & Snacks',
    image: require('./assets/placeholders/category_bakery.png'),
    bg: '#F5EFFA',
    border: '#DCC9F0',
  },
  {
    id: 'c5',
    title: 'Dairy & Eggs',
    image: require('./assets/placeholders/category_dairy.png'),
    bg: '#FFF9E8',
    border: '#F1E0A4',
  },
  {
    id: 'c6',
    title: 'Beverages',
    image: require('./assets/placeholders/category_beverages.png'),
    bg: '#EDF7FD',
    border: '#C7E4F7',
  },
];

const products = {
  exclusive: [
    {
      id: 'p1',
      name: 'Organic Bananas',
      subtitle: '7pcs, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/offer_banana.png'),
      description: 'Fresh bananas placeholder. You can replace this content and image with your own product.',
    },
    {
      id: 'p2',
      name: 'Naturel Red Apple',
      subtitle: '1kg, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/offer_apple.png'),
      description: 'Apples are nutritious. Apples may be good for weight loss, your heart, as part of a healthy diet, and many more.',
    },
  ],
  bestSelling: [
    {
      id: 'p3',
      name: 'Bell Pepper Red',
      subtitle: '1kg, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/best_selling_pepper.png'),
      description: 'Best selling product placeholder text.',
    },
    {
      id: 'p4',
      name: 'Fresh Ginger',
      subtitle: '250gm, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/best_selling_ginger.png'),
      description: 'Best selling product placeholder text.',
    },
  ],
  groceries: [
    {
      id: 'p5',
      name: 'Beef Bone',
      subtitle: '1kg, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/grocery_beef.png'),
      description: 'Grocery placeholder text.',
    },
    {
      id: 'p6',
      name: 'Broiler Chicken',
      subtitle: '1kg, Priceg',
      price: 4.99,
      image: require('./assets/placeholders/grocery_chicken.png'),
      description: 'Grocery placeholder text.',
    },
  ],
};

const beverages = [
  {
    id: 'b1',
    name: 'Diet Coke',
    subtitle: '355ml, Price',
    price: 1.99,
    image: require('./assets/placeholders/bev_diet_coke.png'),
    description: 'Diet Coke placeholder.',
  },
  {
    id: 'b2',
    name: 'Sprite Can',
    subtitle: '325ml, Price',
    price: 1.5,
    image: require('./assets/placeholders/bev_sprite.png'),
    description: 'Sprite placeholder.',
  },
  {
    id: 'b3',
    name: 'Apple & Grape Juice',
    subtitle: '2L, Price',
    price: 15.99,
    image: require('./assets/placeholders/bev_apple_grape.png'),
    description: 'Apple & grape juice placeholder.',
  },
  {
    id: 'b4',
    name: 'Orenge Juice',
    subtitle: '2L, Price',
    price: 15.99,
    image: require('./assets/placeholders/bev_orange_juice.png'),
    description: 'Orange juice placeholder.',
  },
  {
    id: 'b5',
    name: 'Coca Cola Can',
    subtitle: '325ml, Price',
    price: 4.99,
    image: require('./assets/placeholders/bev_coca_cola.png'),
    description: 'Coca cola placeholder.',
  },
  {
    id: 'b6',
    name: 'Pepsi Can',
    subtitle: '330ml, Price',
    price: 4.99,
    image: require('./assets/placeholders/bev_pepsi.png'),
    description: 'Pepsi placeholder.',
  },
];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function AppHeader({ title, onBack, rightIcon, onRightPress }) {
  return (
    <View style={styles.appHeader}>
      <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
        <Ionicons name="chevron-back" size={22} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.appHeaderTitle}>{title}</Text>
      <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
        {rightIcon ? rightIcon : <View style={{ width: 22 }} />}
      </TouchableOpacity>
    </View>
  );
}

function SearchBar({ placeholder = 'Search Store' }) {
  return (
    <View style={styles.searchBar}>
      <Feather name="search" size={18} color={COLORS.text} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.searchInput}
      />
    </View>
  );
}

function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.9} onPress={() => onPress(item)}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onPress(item)}>
          <AntDesign name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function BottomTabBar({ active, onChange }) {
  const tabs = [
    { key: 'shop', label: 'Shop', icon: 'storefront-outline' },
    { key: 'explore', label: 'Explore', icon: 'search-outline' },
    { key: 'cart', label: 'Cart', icon: 'cart-outline' },
    { key: 'favourite', label: 'Favourite', icon: 'heart-outline' },
    { key: 'account', label: 'Account', icon: 'person-outline' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => onChange(tab.key)}>
            <Ionicons name={tab.icon} size={22} color={isActive ? COLORS.primary : COLORS.text} style={{ marginBottom: 4 }} />
            <Text style={[styles.tabText, isActive && { color: COLORS.primary }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SplashScreen({ onNext }) {
  return (
    <SafeAreaView style={[styles.safeArea, styles.splashContainer]}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.fullFlex} activeOpacity={1} onPress={onNext}>
        <View style={styles.centerBox}>
          <Image source={IMAGES.logo} style={styles.splashLogo} resizeMode="contain" />
          <Text style={styles.splashBrand}>nectar</Text>
          <Text style={styles.splashSubBrand}>online groceriet</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function OnboardingScreen({ onNext }) {
  return (
    <ImageBackground source={IMAGES.onboarding} style={styles.fullFlex} resizeMode="cover">
      <SafeAreaView style={styles.fullFlex}>
        <View style={styles.onboardingOverlay}>
          <Image source={IMAGES.logo} style={styles.onboardLogo} resizeMode="contain" />
          <Text style={styles.onboardTitle}>Welcome{'\n'}to our store</Text>
          <Text style={styles.onboardSubTitle}>Ger your groceries in as fast as one hour</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function SignInOptionScreen({ onPhone, onLogin }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={IMAGES.signInHero} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.authContent}>
          <Text style={styles.authMainTitle}>Get your groceries{'\n'}with nectar</Text>

          <TouchableOpacity style={styles.countryRow} onPress={onPhone}>
            <View style={styles.flagBox}>
              <View style={styles.flagGreen} />
              <View style={styles.flagRed} />
            </View>
            <Text style={styles.countryCode}>+880</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or connect with social media</Text>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#5383EC' }]} onPress={onLogin}>
            <AntDesign name="google" size={18} color="#fff" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4A66AC' }]} onPress={onLogin}>
            <FontAwesome name="facebook" size={18} color="#fff" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PhoneNumberScreen({ onBack, onNext, phone, setPhone }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <View style={styles.fullFlex}>
        <AppHeader title="" onBack={onBack} />
        <View style={styles.formScreen}>
          <Text style={styles.formTitle}>Enter your mobile number</Text>
          <Text style={styles.fieldLabel}>Mobile Number</Text>
          <View style={[styles.countryRow, { marginTop: 8 }]}>
            <View style={styles.flagBox}>
              <View style={styles.flagGreen} />
              <View style={styles.flagRed} />
            </View>
            <Text style={styles.countryCode}>+880</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="123456789"
              style={styles.phoneInput}
            />
          </View>
        </View>

        <View style={styles.bottomActionWrap}>
          <TouchableOpacity style={styles.roundNext} onPress={onNext}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function VerificationScreen({ onBack, onNext, code, setCode }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <View style={styles.fullFlex}>
        <AppHeader title="" onBack={onBack} />
        <View style={styles.formScreen}>
          <Text style={styles.formTitle}>Enter your 4-digit code</Text>
          <Text style={styles.fieldLabel}>Code</Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            placeholder="- - - -"
            maxLength={4}
            style={styles.codeInput}
          />
        </View>

        <View style={styles.verificationFooter}>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundNext} onPress={onNext}>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function SelectLocationScreen({ onBack, onSubmit }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <AppHeader title="" onBack={onBack} />
        <View style={styles.locationScreenWrap}>
          <Image source={IMAGES.map} style={styles.mapImage} resizeMode="contain" />
          <Text style={styles.selectLocationTitle}>Select Your Location</Text>
          <Text style={styles.selectLocationSub}>
            Switch on your location to stay in tune with{'\n'}what's happening in your area
          </Text>

          <Text style={styles.fieldLabel}>Your Zone</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectText}>Banassre</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.subText} />
          </View>

          <Text style={styles.fieldLabel}>Your Area</Text>
          <View style={styles.selectBox}>
            <Text style={[styles.selectText, { color: '#B1B1B1' }]}>Types of your area</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.subText} />
          </View>

          <TouchableOpacity style={[styles.primaryButton, { marginTop: 28 }]} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen({ onGoSignUp, onLogin }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <ScrollView contentContainerStyle={styles.loginContent}>
        <Image source={IMAGES.logo} style={styles.smallTopLogo} resizeMode="contain" />
        <Text style={styles.authPageTitle}>Log in</Text>
        <Text style={styles.authPageSub}>Enter your emails and password</Text>

        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput defaultValue="imshuvo97@gmail.com" style={styles.authInput} />

        <Text style={styles.fieldLabel}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput defaultValue="12345678" secureTextEntry style={[styles.authInput, { borderBottomWidth: 0, flex: 1, marginBottom: 0 }]} />
          <Feather name="eye-off" size={18} color="#7C7C7C" />
        </View>

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.bottomLinkRow}>
          <Text style={styles.bottomLinkText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onGoSignUp}>
            <Text style={styles.bottomLinkGreen}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SignUpScreen({ onGoLogin, onSignUp }) {
  return (
    <SafeAreaView style={styles.authSafe}>
      <ScrollView contentContainerStyle={styles.loginContent}>
        <Image source={IMAGES.logo} style={styles.smallTopLogo} resizeMode="contain" />
        <Text style={styles.authPageTitle}>Sign Up</Text>
        <Text style={styles.authPageSub}>Enter your credentials to continue</Text>

        <Text style={styles.fieldLabel}>Username</Text>
        <TextInput defaultValue="Afsar Hossen Shuvo" style={styles.authInput} />

        <Text style={styles.fieldLabel}>Email</Text>
        <View style={styles.passwordBox}>
          <TextInput defaultValue="imshuvo97@gmail.com" style={[styles.authInput, { borderBottomWidth: 0, flex: 1, marginBottom: 0 }]} />
          <Feather name="check" size={18} color={COLORS.primary} />
        </View>

        <Text style={styles.fieldLabel}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput defaultValue="12345678" secureTextEntry style={[styles.authInput, { borderBottomWidth: 0, flex: 1, marginBottom: 0 }]} />
          <Feather name="eye-off" size={18} color="#7C7C7C" />
        </View>

        <Text style={styles.termsText}>
          By continuing you agree to our <Text style={styles.termGreen}>Terms of Service</Text>{' '}
          and <Text style={styles.termGreen}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onSignUp}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.bottomLinkRow}>
          <Text style={styles.bottomLinkText}>Already have an account? </Text>
          <TouchableOpacity onPress={onGoLogin}>
            <Text style={styles.bottomLinkGreen}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({ onOpenProduct, onOpenExplore, onOpenBeverages, onTabChange }) {
  return (
    <SafeAreaView style={styles.appSafe}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.homeHeaderIconWrap}>
          <Image source={IMAGES.logo} style={styles.carrotIcon} resizeMode="contain" />
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={16} color="#4C4F4D" style={{ marginRight: 4 }} />
          <Text style={styles.locationText}>Dhaka, Banassre</Text>
        </View>

        <SearchBar />

        <View style={styles.bannerWrap}>
          <Image source={IMAGES.banner} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerTextBox}>
            
          </View>
        </View>

        <View style={styles.sliderDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <SectionHeader title="Exclusive Offer" onSeeAll={onOpenBeverages} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {products.exclusive.map((item) => (
            <ProductCard key={item.id} item={item} onPress={onOpenProduct} />
          ))}
        </ScrollView>

        <SectionHeader title="Best Selling" onSeeAll={onOpenBeverages} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {products.bestSelling.map((item) => (
            <ProductCard key={item.id} item={item} onPress={onOpenProduct} />
          ))}
        </ScrollView>

        <SectionHeader title="Groceries" onSeeAll={onOpenExplore} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          <View style={[styles.smallCategoryCard, { backgroundColor: '#F8EFE4' }]}>
            <Text style={styles.smallCategoryText}>Pulses</Text>
          </View>
          <View style={[styles.smallCategoryCard, { backgroundColor: '#EDE6D7' }]}>
            <Text style={styles.smallCategoryText}>Rice</Text>
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {products.groceries.map((item) => (
            <ProductCard key={item.id} item={item} onPress={onOpenProduct} />
          ))}
        </ScrollView>
      </ScrollView>

      <BottomTabBar active="shop" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function ExploreScreen({ onBackHome, onOpenBeverages, onTabChange }) {
  return (
    <SafeAreaView style={styles.appSafe}>
      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.exploreTitle}>Find Products</Text>
        <SearchBar />

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.exploreCard, { backgroundColor: item.bg, borderColor: item.border }]}
              onPress={item.id === 'c6' ? onOpenBeverages : onBackHome}
            >
              <Image source={item.image} style={styles.exploreCardImage} resizeMode="contain" />
              <Text style={styles.exploreCardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="explore" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function BeveragesScreen({ onBack, onOpenProduct }) {
  return (
    <SafeAreaView style={styles.appSafe}>
      <View style={styles.screen}>
        <AppHeader
          title="Beverages"
          onBack={onBack}
          rightIcon={<Feather name="sliders" size={18} color={COLORS.text} />}
          onRightPress={() => {}}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.beverageGrid}>
          {beverages.map((item) => (
            <View key={item.id} style={styles.beverageItemWrap}>
              <ProductCard item={item} onPress={onOpenProduct} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function ProductDetailScreen({ item, onBack }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  return (
    <SafeAreaView style={styles.appSafe}>
      <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 20 }}>
        <AppHeader
          title=""
          onBack={onBack}
          rightIcon={<Feather name="share-2" size={18} color={COLORS.text} />}
          onRightPress={() => {}}
        />

        <View style={styles.detailImageBox}>
          <Image source={item.image} style={styles.detailImage} resizeMode="contain" />
          <View style={styles.sliderDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.detailContent}>
          <View style={styles.detailTitleRow}>
            <View>
              <Text style={styles.detailName}>{item.name}</Text>
              <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={22} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailPriceRow}>
            <View style={styles.qtyWrap}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={{ marginRight: 16 }}>
                <AntDesign name="minus" size={16} color="#B3B3B3" />
              </TouchableOpacity>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={{ marginLeft: 16 }}>
                <AntDesign name="plus" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.detailPrice}>{formatPrice(item.price)}</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.expandRow}>
            <Text style={styles.expandTitle}>Product Detail</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.text} />
          </View>
          <Text style={styles.detailDesc}>{item.description}</Text>

          <View style={styles.divider} />
          <View style={styles.expandRow}>
            <Text style={styles.expandTitle}>Nutritions</Text>
            <View style={styles.tagRow}>
              <View style={styles.nutritionTag}>
                <Text style={styles.nutritionTagText}>100gr</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.text} />
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.expandRow}>
            <Text style={styles.expandTitle}>Review</Text>
            <View style={styles.tagRow}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <AntDesign key={i} name="star" size={14} color="#F3603F" style={{ marginLeft: i === 1 ? 0 : 2 }} />
                ))}
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.text} />
            </View>
          </View>

          <TouchableOpacity style={[styles.primaryButton, { marginTop: 24 }]} onPress={onBack}>
            <Text style={styles.primaryButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlaceholderTabScreen({ title, onTabChange, active }) {
  return (
    <SafeAreaView style={styles.appSafe}>
      <View style={[styles.screen, styles.placeholderCenter]}>
        <Ionicons name="construct-outline" size={48} color={COLORS.primary} />
        <Text style={styles.placeholderTitle}>{title}</Text>
        <Text style={styles.placeholderText}>Bạn có thể làm tiếp màn này sau khi hoàn thành 4 màn chính.</Text>
      </View>
      <BottomTabBar active={active} onChange={onTabChange} />
    </SafeAreaView>
  );
}

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [mainTab, setMainTab] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(products.exclusive[1]);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const openProduct = (item) => {
    setSelectedProduct(item);
    setScreen('productDetail');
  };

  const handleTabChange = (tab) => {
    setMainTab(tab);
    if (tab === 'shop') setScreen('home');
    else if (tab === 'explore') setScreen('explore');
    else if (tab === 'cart') setScreen('cart');
    else if (tab === 'favourite') setScreen('favourite');
    else if (tab === 'account') setScreen('account');
  };

  if (screen === 'splash') {
    return <SplashScreen onNext={() => setScreen('onboarding')} />;
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onNext={() => setScreen('signInOption')} />;
  }

  if (screen === 'signInOption') {
    return <SignInOptionScreen onPhone={() => setScreen('phoneNumber')} onLogin={() => setScreen('login')} />;
  }

  if (screen === 'phoneNumber') {
    return (
      <PhoneNumberScreen
        onBack={() => setScreen('signInOption')}
        onNext={() => setScreen('verification')}
        phone={phone}
        setPhone={setPhone}
      />
    );
  }

  if (screen === 'verification') {
    return (
      <VerificationScreen
        onBack={() => setScreen('phoneNumber')}
        onNext={() => setScreen('selectLocation')}
        code={code}
        setCode={setCode}
      />
    );
  }

  if (screen === 'selectLocation') {
    return <SelectLocationScreen onBack={() => setScreen('verification')} onSubmit={() => setScreen('login')} />;
  }

  if (screen === 'login') {
    return <LoginScreen onGoSignUp={() => setScreen('signUp')} onLogin={() => { setMainTab('shop'); setScreen('home'); }} />;
  }

  if (screen === 'signUp') {
    return <SignUpScreen onGoLogin={() => setScreen('login')} onSignUp={() => { setMainTab('shop'); setScreen('home'); }} />;
  }

  if (screen === 'explore') {
    return <ExploreScreen onBackHome={() => setScreen('home')} onOpenBeverages={() => setScreen('beverages')} onTabChange={handleTabChange} />;
  }

  if (screen === 'beverages') {
    return <BeveragesScreen onBack={() => setScreen('explore')} onOpenProduct={openProduct} />;
  }

  if (screen === 'productDetail') {
    return <ProductDetailScreen item={selectedProduct} onBack={() => setScreen('home')} />;
  }

  if (screen === 'cart') {
    return <PlaceholderTabScreen title="Cart Screen" onTabChange={handleTabChange} active="cart" />;
  }

  if (screen === 'favourite') {
    return <PlaceholderTabScreen title="Favourite Screen" onTabChange={handleTabChange} active="favourite" />;
  }

  if (screen === 'account') {
    return <PlaceholderTabScreen title="Account Screen" onTabChange={handleTabChange} active="account" />;
  }

  return <HomeScreen onOpenProduct={openProduct} onOpenExplore={() => setScreen('explore')} onOpenBeverages={() => setScreen('beverages')} onTabChange={handleTabChange} />;
}

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  appSafe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  authSafe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  splashContainer: {
    backgroundColor: COLORS.primary,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 56,
    height: 56,
    tintColor: '#fff',
    marginBottom: 8,
  },
  splashBrand: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  splashSubBrand: {
    color: '#E7F8ED',
    fontSize: 12,
    letterSpacing: 3,
    marginTop: 2,
  },
  onboardingOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 44,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  onboardLogo: {
    width: 42,
    height: 42,
    tintColor: '#fff',
    marginBottom: 18,
    alignSelf: 'center',
  },
  onboardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 50,
  },
  onboardSubTitle: {
    color: '#FCFCFC',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  heroImage: {
    width: '100%',
    height: 280,
  },
  authContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  authMainTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 28,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  flagBox: {
    width: 20,
    height: 14,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagGreen: {
    flex: 1,
    height: 14,
    backgroundColor: '#0B8F50',
  },
  flagRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    position: 'absolute',
    left: 6,
    top: 3,
  },
  countryCode: {
    fontSize: 18,
    color: COLORS.text,
  },
  orText: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 14,
    marginVertical: 34,
  },
  socialButton: {
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
        marginBottom: 16,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  socialIcon: {
    marginRight: 14,
  },
  appHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  appHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  iconBtn: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formScreen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  formTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 34,
  },
  fieldLabel: {
    color: '#7C7C7C',
    fontSize: 14,
    marginBottom: 8,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.text,
  },
  bottomActionWrap: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'flex-end',
  },
  roundNext: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 20,
    letterSpacing: 8,
    color: COLORS.text,
    paddingBottom: 10,
  },
  verificationFooter: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  locationScreenWrap: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  mapImage: {
    width: 220,
    height: 170,
    alignSelf: 'center',
    marginBottom: 16,
  },
  selectLocationTitle: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
  },
  selectLocationSub: {
    textAlign: 'center',
    color: '#7C7C7C',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 36,
  },
  selectBox: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectText: {
    fontSize: 16,
    color: COLORS.text,
  },
  loginContent: {
    paddingHorizontal: 24,
    paddingTop:70,
    paddingBottom: 36,
  },
  smallTopLogo: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    marginBottom: 36,
  },
  authPageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  authPageSub: {
    fontSize: 15,
    color: '#7C7C7C',
    marginBottom: 30,
  },
  authInput: {
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 22,
  },
  passwordBox: {
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  forgotText: {
    color: COLORS.text,
    fontSize: 14,
  },
  bottomLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  bottomLinkText: {
    color: COLORS.text,
    fontSize: 14,
  },
  bottomLinkGreen: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 19,
    marginBottom: 28,
  },
  termGreen: {
    color: COLORS.primary,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  homeHeaderIconWrap: {
    alignItems: 'center',
    marginTop: 6,
  },
  carrotIcon: {
    width: 26,
    height: 26,
  },
  locationRow: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
      },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C4F4D',
  },
  searchBar: {
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.inputBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  bannerWrap: {
    height: 114,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E6F3EA',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerTextBox: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  bannerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.primary,
  },
  sliderDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 16,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  horizontalList: {
    paddingRight: 8,
  },
  productCard: {
    width: 174,
    minHeight: 248,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 14,
    marginRight: 14,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 90,
    marginTop: 6,
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    minHeight: 42,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 2,
  },
  priceRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    paddingRight: 8,
  },
  smallCategoryCard: {
    width: 248,
    height: 90,
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 14,
  },
  smallCategoryText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  tabBar: {
    height: 74,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
      },
  tabText: {
    fontSize: 12,
    color: COLORS.text,
  },
  exploreTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 18,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 14,
  },
  exploreCard: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  exploreCardImage: {
    width: 100,
    height: 72,
    marginBottom: 16,
  },
  exploreCardTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  beverageGrid: {
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  beverageItemWrap: {
    width: '48%',
    marginBottom: 16,
  },
  detailImageBox: {
    backgroundColor: '#F2F3F2',
    borderRadius: 22,
    paddingVertical: 24,
    marginTop: 8,
  },
  detailImage: {
    width: '100%',
    height: 220,
  },
  detailContent: {
    paddingTop: 18,
  },
  detailTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  detailPriceRow: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
      },
  qtyBox: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginTop: 22,
    marginBottom: 18,
  },
  expandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  detailDesc: {
    color: '#7C7C7C',
    lineHeight: 21,
    marginTop: 10,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
      },
  nutritionTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#EBEBEB',
  },
  nutritionTagText: {
    color: '#7C7C7C',
    fontSize: 10,
    fontWeight: '700',
  },
  starsRow: {
    flexDirection: 'row',
      },
  placeholderCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.subText,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
