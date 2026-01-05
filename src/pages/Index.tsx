import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: 'preserves' | 'supplies';
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Огурцы маринованные',
    category: 'preserves',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/608c1618-2e4d-4387-8f9a-a4dad76476ec.jpg',
    description: 'Хрустящие огурчики по домашнему рецепту',
    inStock: true
  },
  {
    id: 2,
    name: 'Помидоры в собственном соку',
    category: 'preserves',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/608c1618-2e4d-4387-8f9a-a4dad76476ec.jpg',
    description: 'Спелые томаты без консервантов',
    inStock: true
  },
  {
    id: 3,
    name: 'Ассорти овощное',
    category: 'preserves',
    price: 580,
    image: 'https://cdn.poehali.dev/files/photo_2026-01-05_20-25-42.jpg',
    description: 'Микс из лучших сезонных овощей',
    inStock: true
  },
  {
    id: 4,
    name: 'Банки стеклянные 0.5л',
    category: 'supplies',
    price: 35,
    image: 'https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/497f1c22-ce24-4d90-a4cf-d8b66ce9a4c4.jpg',
    description: 'Качественное стекло, 10 шт в упаковке',
    inStock: true
  },
  {
    id: 5,
    name: 'Крышки твист-офф',
    category: 'supplies',
    price: 150,
    image: 'https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/497f1c22-ce24-4d90-a4cf-d8b66ce9a4c4.jpg',
    description: 'Надежные завинчивающиеся крышки, 50 шт',
    inStock: true
  },
  {
    id: 6,
    name: 'Этикетки для банок',
    category: 'supplies',
    price: 80,
    image: 'https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/497f1c22-ce24-4d90-a4cf-d8b66ce9a4c4.jpg',
    description: 'Водостойкие этикетки, 100 шт',
    inStock: true
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Leaf" className="text-primary" size={28} />
            <h1 className="text-2xl font-bold text-primary">ЭкоКонсервация</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#technology" className="text-sm font-medium hover:text-primary transition-colors">
              Технология
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        <p className="font-bold">{item.price * item.quantity} ₽</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span>{getTotalPrice()} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://cdn.poehali.dev/projects/3a1bcbe1-3042-4136-81c7-e3f40cd54958/files/e44eaa38-21fd-4b51-95cc-46f34d886fc5.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Натуральная консервация
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Сохраняем природный вкус и пользу овощей
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <a href="#catalog">Перейти в каталог</a>
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог товаров</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="preserves">Консервация</TabsTrigger>
              <TabsTrigger value="supplies">Расходники</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                  <Button 
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Технология консервирования</h2>
          
          <div className="space-y-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Droplets" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Подготовка продуктов</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Тщательный отбор свежих овощей, мытьё в проточной воде и подготовка к консервированию. 
                  Используем только сезонные продукты высшего качества без признаков порчи.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Flame" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Стерилизация</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Обязательная стерилизация банок и крышек при температуре 100°C в течение 15-20 минут. 
                  Это обеспечивает долгий срок хранения и безопасность продукции.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Thermometer" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Термообработка в автоклаве</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Используем промышленный автоклав для стерилизации готовой продукции под давлением при температуре 120-130°C. 
                  Автоклавирование обеспечивает полное уничтожение всех микроорганизмов, включая споры ботулизма, 
                  при этом сохраняя витамины, минералы и натуральный вкус овощей. Этот метод гарантирует длительный 
                  срок хранения продукции без использования консервантов.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="PackageCheck" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-2xl">Укупорка и хранение</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Герметичная укупорка банок сразу после наполнения. Охлаждение и хранение в тёмном прохладном месте. 
                  Контроль качества на каждом этапе производства.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8">Преимущества консервирования в автоклаве</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Автоклав — современное решение для безопасного и эффективного консервирования
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Gauge" className="text-primary" size={20} />
                    Высокая температура обработки
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Температура достигает 120°C и выше (против 100°C при традиционном кипячении)</p>
                  <p>• Обеспечивает надёжную стерилизацию, уничтожая даже стойкие микроорганизмы</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-primary" size={20} />
                    Сокращение времени приготовления
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Процесс в 2–3 раза быстрее, чем при использовании водяной бани</p>
                  <p>• Например, помидоры обрабатываются за 20–30 минут вместо 1,5–2 часов</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Apple" className="text-primary" size={20} />
                    Сохранение питательных веществ
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Короткий цикл нагрева минимизирует потерю витаминов и минералов</p>
                  <p>• Продукты сохраняют естественный вкус, цвет и текстуру</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Waves" className="text-primary" size={20} />
                    Равномерный прогрев
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Высокое давление обеспечивает проникновение тепла во все слои</p>
                  <p>• Исключается риск неполной стерилизации отдельных участков</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Coins" className="text-primary" size={20} />
                    Экономия ресурсов
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Не требуется предварительная стерилизация банок</p>
                  <p>• Можно использовать реторт-пакеты как альтернативу стеклянным банкам</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShieldCheck" className="text-primary" size={20} />
                    Безопасность готовых консервов
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Снижен риск порчи и развития ботулизма благодаря глубокой стерилизации</p>
                  <p>• Герметичность системы исключает попадание воздуха и бактерий</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="text-primary" size={20} />
                    Удобство эксплуатации
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Автоматический контроль температуры и давления</p>
                  <p>• Минимум ручного контроля — достаточно загрузить банки и задать параметры</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Sparkles" className="text-primary" size={20} />
                    Универсальность применения
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Подходит для консервирования овощей, фруктов, мяса, рыбы</p>
                  <p>• Позволяет готовить блюда, недоступные при традиционных методах</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingDown" className="text-primary" size={20} />
                    Долгосрочная экономия
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Снижение затрат на ингредиенты (можно обойтись без уксуса)</p>
                  <p>• Меньше испорченных банок за счёт надёжной стерилизации</p>
                  <p>• Окупаемость оборудования за 2–3 сезона при регулярном использовании</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Scaling" className="text-primary" size={20} />
                    Гибкость объёмов
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Доступны модели от мини-автоклавов на 3–5 банок</p>
                  <p>• До промышленных на 40+ литров под масштабы производства</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
              <p className="text-center font-semibold text-lg">
                <Icon name="CheckCircle2" className="inline mr-2 text-primary" size={24} />
                Итог: автоклав сочетает безопасность, скорость и качество, делая консервирование более эффективным 
                и экономичным по сравнению с традиционными методами
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Icon name="Heart" className="mx-auto mb-6 text-primary" size={48} />
          <h2 className="text-4xl font-bold mb-6">О нас</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Мы — семейное производство с 15-летним опытом в консервировании. 
            Используем только натуральные ингредиенты и проверенные временем рецепты. 
            Наша миссия — сохранить природный вкус и пользу овощей круглый год.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6">
              <Icon name="CheckCircle2" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-xl mb-2">100% натурально</h3>
              <p className="text-muted-foreground">Без консервантов и красителей</p>
            </div>
            <div className="p-6">
              <Icon name="Award" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-xl mb-2">Качество</h3>
              <p className="text-muted-foreground">Контроль на всех этапах</p>
            </div>
            <div className="p-6">
              <Icon name="Truck" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-xl mb-2">Доставка</h3>
              <p className="text-muted-foreground">По всей России</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary/5 py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Leaf" className="text-primary" size={24} />
            <span className="font-bold text-xl">ЭкоКонсервация</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Натуральная консервация с заботой о природе
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Доставка</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Оплата</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;