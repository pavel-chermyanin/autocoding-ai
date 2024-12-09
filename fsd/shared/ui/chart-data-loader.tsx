import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChartsDataLoading } from "@/entities/chart";
import { Loader } from "rsuite";

export const ChartDataLoader = () => {
  const chartsLoading = useSelector(selectChartsDataLoading);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false); // Новое состояние для анимации

  useEffect(() => {
    if (chartsLoading) {
      setIsVisible(true); // Показываем элемент
      setTimeout(() => setShouldAnimate(true), 10); // Запускаем анимацию с небольшой задержкой
    } else {
      setShouldAnimate(false); // Останавливаем анимацию при скрытии
      setTimeout(() => setIsVisible(false), 300); // Добавляем задержку для плавного исчезновения
    }
  }, [chartsLoading]);

  return (
    <>
      {isVisible && (
        <div
          style={{

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "0",
            left: "50%",
            transform: `translateX(-50%) ${shouldAnimate ? "translateY(0)" : "translateY(-100%)"}`, // Объединение transform
            width: "40px",
            height: "40px",
            backgroundColor: "white",
            boxShadow: "0 4px 4px rgba(0, 0, 0, .12), 0 0 10px rgba(0, 0, 0, .06)",
            borderRadius: "5px",
            zIndex: 1000,
            opacity: shouldAnimate ? 1 : 0, // Плавное изменение прозрачности
            transition: "opacity 0.3s ease, transform 0.3s ease", // Плавный переход
          }}
        >
          <Loader />
        </div>
      )}
    </>
  );
};
