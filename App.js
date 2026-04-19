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
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import products from './data';

const allProducts = products;

const COLORS = {
  primary: '#53B175',
  text: '#181725',
  subText: '#7C7C7C',
  border: '#E2E2E2',
  bg: '#FFFFFF',
  inputBg: '#F2F3F2',
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
  {
    id: 'c7',
    title: 'Eggs',
    image: require('./assets/placeholders/category_dairy.png'),
    bg: '#F4FFF3',
    border: '#B8E3B5',
  },
  {
    id: 'c8',
    title: 'Noodles\n& Pasta',
    image: require('./assets/placeholders/category_bakery.png'),
    bg: '#FFF7F0',
    border: '#F0C9A8',
  },
  {
    id: 'c9',
    title: 'Chips & Crisps',
    image: require('./assets/placeholders/category_bakery.png'),
    bg: '#FFF5F7',
    border: '#F3C4CF',
  },
  {
    id: 'c10',
    title: 'Fast Food',
    image: require('./assets/placeholders/category_meat.png'),
    bg: '#F7F7FF',
    border: '#D4D4F5',
  },
];
function formatPrice(value) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return '$0.00';
  }
  return `$${numberValue.toFixed(2)}`;
}

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search Store',
  rightIcon,
  onRightPress,
  editable = true,
  autoFocus = false,
  onPress,
}) {
  const content = (
    <View style={styles.searchBar}>
      <Feather name="search" size={18} color={COLORS.text} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.searchInput}
        editable={editable}
        autoFocus={autoFocus}
        pointerEvents={editable ? 'auto' : 'none'}
      />
      {editable && value ? (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={18} color="#C7C7C7" />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View style={styles.searchRow}>
      {editable ? (
        content
      ) : (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ flex: 1 }}>
          {content}
        </TouchableOpacity>
      )}

      {rightIcon ? (
        <TouchableOpacity style={styles.filterIconBtn} onPress={onRightPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function ProductCard({ item, onPress, onAdd }) {
  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.9}
      onPress={() => onPress(item)}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item)}>
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
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onChange(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? COLORS.primary : COLORS.text}
            />
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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

function SimpleHeader({ title, leftIcon, onLeftPress, rightIcon, onRightPress }) {
  return (
    <View style={styles.simpleHeader}>
      <TouchableOpacity style={styles.iconArea} onPress={onLeftPress}>
        {leftIcon || <View style={{ width: 20 }} />}
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity style={styles.iconArea} onPress={onRightPress}>
        {rightIcon || <View style={{ width: 20 }} />}
      </TouchableOpacity>
    </View>
  );
}

function SplashScreen({ onNext }) {
  return (
    <SafeAreaView style={[styles.safeArea, styles.splashContainer]}>
      <TouchableOpacity style={styles.flex1} activeOpacity={1} onPress={onNext}>
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
    <ImageBackground source={IMAGES.onboarding} style={styles.flex1} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.onboardingOverlay}>
          <Image source={IMAGES.logo} style={styles.onboardLogo} />
          <Text style={styles.onboardTitle}>Welcome{'\n'}to our store</Text>
          <Text style={styles.onboardSub}>Ger your groceries in as fast as one hour</Text>
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
    <SafeAreaView style={styles.screenSafe}>
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

          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#5383EC' }]}
            onPress={onLogin}
          >
            <AntDesign name="google" size={18} color="#fff" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#4A66AC' }]}
            onPress={onLogin}
          >
            <FontAwesome name="facebook" size={18} color="#fff" />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen({ onGoSignUp, onLogin }) {
  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView contentContainerStyle={styles.authFormWrap}>
        <Image source={IMAGES.logo} style={styles.smallLogo} />
        <Text style={styles.authTitle}>Loging</Text>
        <Text style={styles.authSub}>Enter your emails and password</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput defaultValue="imshuvo97@gmail.com" style={styles.lineInput} />

        <Text style={styles.label}>Password</Text>
        <View style={styles.lineInputRow}>
          <TextInput defaultValue="12345678" secureTextEntry style={styles.lineInputFlex} />
          <Feather name="eye-off" size={18} color="#7C7C7C" />
        </View>

        <Text style={styles.forgot}>Forgot Password?</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.inlineCenter}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={onGoSignUp}>
            <Text style={styles.greenText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SignUpScreen({ onGoLogin, onSignUp }) {
  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView contentContainerStyle={styles.authFormWrap}>
        <Image source={IMAGES.logo} style={styles.smallLogo} />
        <Text style={styles.authTitle}>Sign Up</Text>
        <Text style={styles.authSub}>Enter your credentials to continue</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput defaultValue="Afsar Hossen Shuvo" style={styles.lineInput} />

        <Text style={styles.label}>Email</Text>
        <View style={styles.lineInputRow}>
          <TextInput defaultValue="imshuvo97@gmail.com" style={styles.lineInputFlex} />
          <Feather name="check" size={18} color={COLORS.primary} />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.lineInputRow}>
          <TextInput defaultValue="12345678" secureTextEntry style={styles.lineInputFlex} />
          <Feather name="eye-off" size={18} color="#7C7C7C" />
        </View>

        <Text style={styles.termText}>
          By continuing you agree to our <Text style={styles.greenText}>Terms of Service</Text> and{' '}
          <Text style={styles.greenText}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onSignUp}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.inlineCenter}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={onGoLogin}>
            <Text style={styles.greenText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({
  onOpenProduct,
  onOpenExplore,
  onOpenBeverages,
  onAdd,
  onTabChange,
  onOpenSearch,
}) {
  const exclusiveProducts = allProducts.filter((item) => item.group === 'exclusive');
  const bestSellingProducts = allProducts.filter((item) => item.group === 'bestSelling');
  const groceryProducts = allProducts.filter((item) => item.group === 'groceries');

  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView style={styles.mainScreen} showsVerticalScrollIndicator={false}>
        <View style={styles.topLogoWrap}>
          <Image source={IMAGES.logo} style={styles.tinyLogo} />
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={16} color="#4C4F4D" />
          <Text style={styles.locationText}>Dhaka, Banassre</Text>
        </View>

        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Search Store"
          editable={false}
          onPress={onOpenSearch}
        />

        <View style={styles.bannerWrap}>
          <Image source={IMAGES.banner} style={styles.bannerImage} />
        </View>

        <View style={styles.dotsWrap}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <SectionHeader title="Exclusive Offer" onSeeAll={onOpenBeverages} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exclusiveProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={onOpenProduct}
              onAdd={onAdd}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Best Selling" onSeeAll={onOpenBeverages} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSellingProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={onOpenProduct}
              onAdd={onAdd}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Groceries" onSeeAll={onOpenExplore} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.smallTagCard, { backgroundColor: '#F8EFE4' }]}>
            <Text style={styles.smallTagText}>Pulses</Text>
          </View>
          <View style={[styles.smallTagCard, { backgroundColor: '#ECE4D8' }]}>
            <Text style={styles.smallTagText}>Rice</Text>
          </View>
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {groceryProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={onOpenProduct}
              onAdd={onAdd}
            />
          ))}
        </ScrollView>
      </ScrollView>

      <BottomTabBar active="shop" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function ExploreScreen({ onOpenBeverages, onOpenSearch, onTabChange }) {
  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView style={styles.mainScreen} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Find Products</Text>

        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Search Store"
          editable={false}
          onPress={onOpenSearch}
        />

        <View style={styles.gridWrap}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: item.bg, borderColor: item.border }]}
              onPress={item.id === 'c6' ? onOpenBeverages : onOpenSearch}
            >
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="explore" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function BeveragesScreen({ onBack, onOpenProduct, onAdd }) {
  const items = allProducts.filter((item) => item.section === 'beverages');

  return (
    <SafeAreaView style={styles.screenSafe}>
      <SimpleHeader
        title="Beverages"
        leftIcon={<Ionicons name="chevron-back" size={22} color={COLORS.text} />}
        onLeftPress={onBack}
        rightIcon={<Feather name="sliders" size={18} color={COLORS.text} />}
      />

      <ScrollView style={styles.mainScreen}>
        <View style={styles.twoColGrid}>
          {items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={onOpenProduct}
              onAdd={onAdd}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchScreen({
  onOpenProduct,
  onAdd,
  onOpenFilters,
  onTabChange,
  selectedCategories,
  selectedBrands,
}) {
  const [query, setQuery] = useState('');

  const filteredProducts = allProducts.filter((item) => {
    if (item.section !== 'search') return false;

    const keyword = query.toLowerCase().trim();

    const matchText =
      keyword === '' ||
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.brand.toLowerCase().includes(keyword);

    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);

    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.brand);

    return matchText && matchCategory && matchBrand;
  });

  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView style={styles.mainScreen}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search Store"
          rightIcon={<Feather name="sliders" size={18} color={COLORS.text} />}
          onRightPress={onOpenFilters}
          autoFocus
        />

        <View style={styles.twoColGrid}>
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={onOpenProduct}
              onAdd={onAdd}
            />
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="explore" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function FiltersScreen({
  onClose,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  onApply,
}) {
  const categoryOptions = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
  const brandOptions = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farms'];

  const toggle = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((x) => x !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <SafeAreaView style={styles.screenSafe}>
      <View style={styles.mainScreen}>
        <SimpleHeader
          title="Filters"
          leftIcon={<AntDesign name="close" size={20} color={COLORS.text} />}
          onLeftPress={onClose}
        />

        <View style={styles.filterBox}>
          <Text style={styles.filterSectionTitle}>Categories</Text>

          {categoryOptions.map((item) => {
            const active = selectedCategories.includes(item);

            return (
              <TouchableOpacity
                key={item}
                style={styles.filterRow}
                onPress={() => toggle(item, selectedCategories, setSelectedCategories)}
              >
                <View style={[styles.checkbox, active && styles.checkboxActive]}>
                  {active ? <Feather name="check" size={14} color="#fff" /> : null}
                </View>
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}

          <Text style={[styles.filterSectionTitle, { marginTop: 26 }]}>Brand</Text>

          {brandOptions.map((item) => {
            const active = selectedBrands.includes(item);

            return (
              <TouchableOpacity
                key={item}
                style={styles.filterRow}
                onPress={() => toggle(item, selectedBrands, setSelectedBrands)}
              >
                <View style={[styles.checkbox, active && styles.checkboxActive]}>
                  {active ? <Feather name="check" size={14} color="#fff" /> : null}
                </View>
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { marginHorizontal: 8, marginTop: 'auto', marginBottom: 24 }]}
          onPress={onApply}
        >
          <Text style={styles.primaryButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CartScreen({ cartItems, onIncrease, onDecrease, onRemove, onTabChange }) {
  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  return (
    <SafeAreaView style={styles.screenSafe}>
      <View style={styles.flex1}>
        <Text style={[styles.pageTitle, { marginBottom: 12 }]}>My Cart</Text>

        <ScrollView style={styles.mainScreen}>
          {cartItems.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.cartRow}>
              <Image source={item.image} style={styles.cartImage} resizeMode="contain" />

              <View style={{ flex: 1 }}>
                <View style={styles.cartTitleRow}>
                  <View>
                    <Text style={styles.cartName}>{item.name}</Text>
                    <Text style={styles.productSubtitle}>{item.subtitle}</Text>
                  </View>

                  <TouchableOpacity onPress={() => onRemove(item.id)}>
                    <AntDesign name="close" size={16} color="#B3B3B3" />
                  </TouchableOpacity>
                </View>

                <View style={styles.cartBottomRow}>
                  <View style={styles.qtyPillWrap}>
                    <TouchableOpacity style={styles.qtyPill} onPress={() => onDecrease(item.id)}>
                      <AntDesign name="minus" size={14} color="#B3B3B3" />
                    </TouchableOpacity>

                    <Text style={styles.cartQtyText}>{item.qty}</Text>

                    <TouchableOpacity style={styles.qtyPill} onPress={() => onIncrease(item.id)}>
                      <AntDesign name="plus" size={14} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.cartPrice}>
                    {formatPrice(Number(item.price) * Number(item.qty))}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.checkoutWrap}>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.primaryButtonText}>Go to Checkout</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeText}>{formatPrice(total)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar active="cart" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function FavouriteScreen({ items, onAddAll, onTabChange }) {
  return (
    <SafeAreaView style={styles.screenSafe}>
      <View style={styles.flex1}>
        <Text style={[styles.pageTitle, { marginBottom: 12 }]}>Favourite</Text>

        <ScrollView style={styles.mainScreen}>
          {items.map((item) => (
            <View key={item.id} style={styles.favoriteRow}>
              <Image source={item.image} style={styles.favoriteImage} resizeMode="contain" />

              <View style={{ flex: 1 }}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.productSubtitle}>{item.subtitle}</Text>
              </View>

              <Text style={styles.favoritePrice}>{formatPrice(item.price)}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.text} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.checkoutWrap}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={onAddAll}>
            <Text style={styles.primaryButtonText}>Add All To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar active="favourite" onChange={onTabChange} />
    </SafeAreaView>
  );
}

function ProductDetailScreen({ item, onBack, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <SafeAreaView style={styles.screenSafe}>
      <ScrollView style={styles.mainScreen}>
        <SimpleHeader
          title=""
          leftIcon={<Ionicons name="chevron-back" size={22} color={COLORS.text} />}
          onLeftPress={onBack}
          rightIcon={<Feather name="share-2" size={18} color={COLORS.text} />}
        />

        <View style={styles.detailImageBox}>
          <Image source={item.image} style={styles.detailImage} resizeMode="contain" />
          <View style={styles.dotsWrap}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.detailHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.detailName}>{item.name}</Text>
            <Text style={styles.productSubtitle}>{item.subtitle}</Text>
          </View>
          <Feather name="heart" size={22} color="#7C7C7C" />
        </View>

        <View style={styles.detailQtyRow}>
          <View style={styles.qtyPillWrap}>
            <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
              <AntDesign name="minus" size={16} color="#B3B3B3" />
            </TouchableOpacity>

            <View style={styles.detailQtyBox}>
              <Text>{qty}</Text>
            </View>

            <TouchableOpacity onPress={() => setQty(qty + 1)}>
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

        <Text style={styles.detailDesc}>
          {item.description || 'Replace this description with your own content.'}
        </Text>

        <View style={styles.divider} />
        <View style={styles.expandRow}>
          <Text style={styles.expandTitle}>Nutritions</Text>
          <View style={styles.tagMini}>
            <Text style={styles.tagMiniText}>100gr</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.expandRow}>
          <Text style={styles.expandTitle}>Review</Text>
          <Text style={styles.stars}>★★★★★</Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 24, marginBottom: 24 }]}
          onPress={() => onAdd(item, qty)}
        >
          <Text style={styles.primaryButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlaceholderScreen({ title, onTabChange, active }) {
  return (
    <SafeAreaView style={styles.screenSafe}>
      <View style={[styles.flex1, styles.placeholderCenter]}>
        <Ionicons name="construct-outline" size={42} color={COLORS.primary} />
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
      <BottomTabBar active={active} onChange={onTabChange} />
    </SafeAreaView>
  );
}

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [mainTab, setMainTab] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(allProducts[1] || allProducts[0]);

  const buildCartItem = (seed) => {
    const product = allProducts.find((item) => item.id === seed.id);
    if (!product) return null;

    const finalPrice = Number(seed.price ?? product.price);

    return {
      ...product,
      ...seed,
      price: Number.isFinite(finalPrice) ? finalPrice : 0,
      qty: seed.qty ?? 1,
    };
  };

  const initialCartData = [
    { id: 'p3', qty: 1 },
    { id: 's1', qty: 1 },
    { id: 'p1', qty: 1, price: 3.0, subtitle: '12kg, Price' },
    { id: 'p4', qty: 1 },
  ];

  const [cartItems, setCartItems] = useState(
    initialCartData.map(buildCartItem).filter(Boolean)
  );

  const [favoriteItems] = useState(allProducts.filter((item) => item.favorite));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const showAddedMessage = (name) => {
    const message = `Đã thêm ${name} vào giỏ hàng`;
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Thông báo', message);
    }
  };

  const addToCart = (item, qty = 1) => {
    setCartItems((prev) => {
      const found = prev.find((x) => x.id === item.id);

      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + qty } : x
        );
      }

      return [...prev, { ...item, qty }];
    });

    showAddedMessage(item.name);
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  const addAllFavorites = () => {
    favoriteItems.forEach((item) => addToCart(item, 1));
  };

  const openProduct = (item) => {
    setSelectedProduct(item);
    setScreen('product');
  };

  const openSearch = () => {
    setScreen('search');
  };

  const changeTab = (tab) => {
    setMainTab(tab);

    if (tab === 'shop') setScreen('home');
    if (tab === 'explore') setScreen('explore');
    if (tab === 'cart') setScreen('cart');
    if (tab === 'favourite') setScreen('favourite');
    if (tab === 'account') setScreen('account');
  };

  if (screen === 'splash') {
    return <SplashScreen onNext={() => setScreen('onboarding')} />;
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onNext={() => setScreen('signin-option')} />;
  }

  if (screen === 'signin-option') {
    return (
      <SignInOptionScreen
        onPhone={() => setScreen('login')}
        onLogin={() => setScreen('login')}
      />
    );
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onGoSignUp={() => setScreen('signup')}
        onLogin={() => setScreen('home')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignUpScreen
        onGoLogin={() => setScreen('login')}
        onSignUp={() => setScreen('home')}
      />
    );
  }

  if (screen === 'beverages') {
    return (
      <BeveragesScreen
        onBack={() => setScreen('explore')}
        onOpenProduct={openProduct}
        onAdd={addToCart}
      />
    );
  }

  if (screen === 'search') {
    return (
      <SearchScreen
        onOpenProduct={openProduct}
        onAdd={addToCart}
        onOpenFilters={() => setScreen('filters')}
        onTabChange={changeTab}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
      />
    );
  }

  if (screen === 'filters') {
    return (
      <FiltersScreen
        onClose={() => setScreen('search')}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        onApply={() => setScreen('search')}
      />
    );
  }

  if (screen === 'cart') {
    return (
      <CartScreen
        cartItems={cartItems}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeCartItem}
        onTabChange={changeTab}
      />
    );
  }

  if (screen === 'favourite') {
    return (
      <FavouriteScreen
        items={favoriteItems}
        onAddAll={addAllFavorites}
        onTabChange={changeTab}
      />
    );
  }

  if (screen === 'product') {
    return (
      <ProductDetailScreen
        item={selectedProduct}
        onBack={() => setScreen('home')}
        onAdd={addToCart}
      />
    );
  }

  if (screen === 'explore') {
    return (
      <ExploreScreen
        onOpenBeverages={() => setScreen('beverages')}
        onOpenSearch={openSearch}
        onTabChange={changeTab}
      />
    );
  }

  if (screen === 'account') {
    return (
      <PlaceholderScreen
        title="Account Screen"
        active="account"
        onTabChange={changeTab}
      />
    );
  }

  return (
    <HomeScreen
      onOpenProduct={openProduct}
      onOpenExplore={() => setScreen('explore')}
      onOpenBeverages={() => setScreen('beverages')}
      onAdd={addToCart}
      onTabChange={changeTab}
      onOpenSearch={openSearch}
    />
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenSafe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 6 : 0,
  },
  splashContainer: { backgroundColor: COLORS.primary },
  centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  splashLogo: { width: 52, height: 52, tintColor: '#fff', marginBottom: 8 },
  splashBrand: { color: '#fff', fontSize: 38, fontWeight: '700' },
  splashSubBrand: { color: '#eaf7ee', fontSize: 12, letterSpacing: 3 },
  onboardingOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 44,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  onboardLogo: {
    width: 38,
    height: 38,
    tintColor: '#fff',
    alignSelf: 'center',
    marginBottom: 18,
  },
  onboardTitle: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 50,
  },
  onboardSub: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  heroImage: { width: '100%', height: 250 },
  authContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  authMainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 34,
    marginBottom: 30,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  flagBox: { width: 20, height: 14, marginRight: 10 },
  flagGreen: { flex: 1, backgroundColor: '#0B8F50', height: 14 },
  flagRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    position: 'absolute',
    left: 6,
    top: 3,
  },
  countryCode: { fontSize: 18, color: COLORS.text },
  orText: { textAlign: 'center', color: '#828282', marginVertical: 34 },
  socialButton: {
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  socialButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  authFormWrap: { paddingHorizontal: 24, paddingBottom: 30 },
  smallLogo: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 34,
  },
  authTitle: { fontSize: 26, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  authSub: { color: '#7C7C7C', marginBottom: 26 },
  label: { color: '#7C7C7C', fontSize: 14, marginBottom: 6 },
  lineInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    height: 44,
    marginBottom: 18,
    fontSize: 16,
  },
  lineInputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    minHeight: 44,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineInputFlex: { flex: 1, fontSize: 16 },
  forgot: { textAlign: 'right', marginBottom: 24, color: COLORS.text },
  inlineCenter: { marginTop: 24, flexDirection: 'row', justifyContent: 'center' },
  greenText: { color: COLORS.primary, fontWeight: '700' },
  termText: { color: '#7C7C7C', fontSize: 13, lineHeight: 18, marginBottom: 22 },
  mainScreen: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  topLogoWrap: { alignItems: 'center', marginTop: 6 },
  tinyLogo: { width: 24, height: 24 },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C4F4D',
    marginLeft: 4,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterIconBtn: { width: 38, alignItems: 'center', justifyContent: 'center' },
  bannerWrap: { height: 114, borderRadius: 18, overflow: 'hidden', marginBottom: 10 },
  bannerImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  dotsWrap: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
  },
  dotActive: { width: 16, backgroundColor: COLORS.primary },
  sectionHeader: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: COLORS.text },
  seeAllText: { color: COLORS.primary, fontWeight: '600' },
  productCard: {
    width: 174,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14,
    marginRight: 14,
    marginBottom: 14,
  },
  productImage: { width: '100%', height: 100, marginBottom: 10 },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    minHeight: 42,
  },
  productSubtitle: { fontSize: 13, color: COLORS.subText, marginTop: 4 },
  priceRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTagCard: {
    width: 248,
    height: 90,
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 14,
  },
  smallTagText: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  tabBar: {
    height: 74,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 12, color: COLORS.text, marginTop: 4 },
  tabTextActive: { color: COLORS.primary, fontWeight: '700' },
  pageTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 10,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  categoryCard: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: { width: 90, height: 70, marginBottom: 16 },
  categoryText: {
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
  },
  simpleHeader: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconArea: { width: 26, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  filterBox: {
    backgroundColor: '#F2F3F2',
    borderRadius: 24,
    padding: 20,
    marginTop: 12,
  },
  filterSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#B1B1B1',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  checkboxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterLabel: { color: COLORS.text, fontSize: 16 },
  filterLabelActive: { color: COLORS.primary },
  cartRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  cartImage: { width: 72, height: 72, marginRight: 12 },
  cartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cartName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  cartBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  qtyPillWrap: { flexDirection: 'row', alignItems: 'center' },
  qtyPill: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQtyText: { marginHorizontal: 16, fontWeight: '600', fontSize: 16 },
  cartPrice: { fontWeight: '700', fontSize: 20, color: COLORS.text },
  checkoutWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: '#fff',
  },
  checkoutBtn: {
    height: 60,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  totalBadge: {
    position: 'absolute',
    right: 14,
    backgroundColor: '#489E67',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  totalBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  favoriteImage: { width: 34, height: 62, marginRight: 16 },
  favoritePrice: { fontWeight: '700', color: COLORS.text, marginRight: 8 },
  detailImageBox: {
    backgroundColor: '#F2F3F2',
    borderRadius: 22,
    paddingVertical: 24,
    marginTop: 8,
  },
  detailImage: { width: '100%', height: 220 },
  detailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  detailName: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  detailQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
  },
  detailQtyBox: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  detailPrice: { fontSize: 24, fontWeight: '700', color: COLORS.text },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginTop: 20, marginBottom: 16 },
  expandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandTitle: { fontWeight: '700', fontSize: 16, color: COLORS.text },
  detailDesc: { color: COLORS.subText, lineHeight: 20, marginTop: 8 },
  tagMini: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagMiniText: { color: COLORS.subText, fontSize: 11, fontWeight: '700' },
  stars: { color: '#F3603F', letterSpacing: 2, fontSize: 14 },
  placeholderCenter: { alignItems: 'center', justifyContent: 'center' },
});