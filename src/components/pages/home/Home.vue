<template>
  <div>
    <Select
      label="Выбор сервиса"
      :items="select.items"
      @input="(value) => selectService(value)"
    />
    <div class="datepickers">
      <div class="datepickers__picker">
        <DatePicker
          label="Дата от"
          :setDate="(date) => selectDate('from', date)"
        />
      </div>
      <div class="datepickers__picker">
        <DatePicker
          label="Дата до"
          :setDate="(date) => selectDate('to', date)"
        />
      </div>
    </div>
    <div class="days">
      <div class="day__wrapper" v-for="day in days" :key="day.date">
        <div class="day__title">{{ formatTitle(day.date) }}</div>
        <div class="day__header">
          <div v-if="getCabinetNumber(day)" class="day__cabinet">
            {{ getCabinetNumber(day) }}
          </div>
          <div class="day__select">
            <Select
              label="Выбор кабинета"
              :items="getCabinetsForSelect(day.cabinets)"
              @input="(cabinetId) => selectCabinet(cabinetId, day)"
            />
          </div>
        </div>
        <div class="table-rows">
          <div class="table-row" v-for="hour in hours" :key="hour">
            {{ hour }}
          </div>
          <div
            v-for="(reservedService, index) in getCabinetReservedServices(day)"
            :key="`${reservedService}${Math.random()}`"
          >
            <div
              class="day-cell"
              :style="{
                top: `${getCellTop(reservedService.startDate)}px`,
                left: `${getCellLeft(index)}px`,
                backgroundColor: getCellBackground(reservedService.status.id),
                height: `${getCellHeight(
                  reservedService.service.serviceDuration
                )}px`,
              }"
            >
              <div class="day-cell__service">
                {{ reservedService.service.name }}
              </div>
              <div class="day-cell__client">
                {{
                  `${reservedService.client.surname} ${reservedService.client.name}`
                }}
              </div>
            </div>
            <div
              v-if="reservedService.service.cleanDuration"
              class="day-cell__clean"
              :style="{
                height: `${getCellHeight(
                  reservedService.service.cleanDuration
                )}px`,
                top: `${getCellTop(reservedService.startDate) +
                  getCellHeight(reservedService.service.serviceDuration)}px`,
              }"
            >
              Уборка
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import Select from "@components/ui/select/Select.vue";
import DatePicker from "@components/ui/date-picker/Datepicker.vue";

import { getServices } from "@api/services";
import { getBookings } from "@api/bookings";

export default {
  name: "Home",
  components: {
    Select,
    DatePicker,
  },
  data() {
    return {
      select: {
        items: [],
        selected: null,
      },
      dates: {
        from: "",
        to: "",
      },
      days: [],
      daysCabinets: {},
      hours: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    /*загрузка данных*/
    async fetchServices() {
      try {
        const services = await getServices();
        if (services?.data?.services) {
          this.select.items = services.data.services.map((service) => ({
            text: service.name,
            value: service.id,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    },
    async fetchServicesBookings(serviceId) {
      try {
        const data = new FormData();
        if (this.dates.from)
          data.append("dateFrom", `${this.dates.from}T00:00:00`);
        if (this.dates.to) data.append("dateTo", `${this.dates.to}T00:00:00`);

        const bookings = await getBookings(serviceId, data);
        if (bookings?.data?.dates) {
          this.days = bookings?.data?.dates;
          this.daysCabinets = {};
        }
      } catch (e) {
        console.log(e);
      }
    },
    /*для селекта выбора сервиса */
    selectService(serviceId) {
      this.select.selected = serviceId;
      this.fetchServicesBookings(serviceId);
    },
    /*для выбора даты */
    selectDate(dateType, value) {
      this.dates[dateType] = value;
      if (this.dates.from && this.dates.to && this.select.selected)
        this.fetchServicesBookings(this.select.selected);
    },
    /*для селекта кабинета*/
    selectCabinet(selectedCabinetId, day) {
      const cabinetNumber =
        day.cabinets.find(({ cabinet }) => +cabinet.id === +selectedCabinetId)
          ?.cabinet?.number || "";
      const reservedServices =
        day.cabinets.find(({ cabinet }) => +cabinet.id === +selectedCabinetId)
          ?.reservedServices || [];
      this.daysCabinets = {
        ...this.daysCabinets,
        [day.date]: { selectedCabinetId, reservedServices, cabinetNumber },
      };
    },
    getCabinetsForSelect(cabinets) {
      return cabinets.map(({ cabinet }) => ({
        text: cabinet.name,
        value: cabinet.id,
      }));
    },
    getCabinetNumber(day) {
      return this.daysCabinets[day.date]?.cabinetNumber || "";
    },
    getCabinetReservedServices(day) {
      return this.daysCabinets[day.date]?.reservedServices || [];
    },
    /*получение стилей для ячеек таблицы */
    getCellTop(startDate) {
      const date = new Date(startDate);
      const hours = date.getMinutes().toString();
      const getTopByHours = {
        "9": 0,
        "10": 40,
        "11": 80,
        "12": 120,
        "13": 160,
        "14": 200,
        "15": 240,
        "16": 280,
        "17": 320,
        "18": 360,
      };
      return getTopByHours[hours];
    },
    getCellLeft() {
      return 50; //`${50 + 50 * index}px`;
    },
    getCellBackground(statusId) {
      const colors = ["#AA96DA", "#00B8A9", "#48466D", "#F38181"];
      return colors[statusId];
    },
    getCellHeight(duration) {
      const percent = (duration * 100) / 3600000;
      return (40 * percent) / 100;
    },
    formatTitle(date) {
      return format(new Date(date), "dd.MM EEEE", { locale: ru });
    },
  },
};
</script>

<style lang="scss" scoped>
.datepickers {
  display: flex;
  align-items: center;

  &__picker {
    width: 300px;
    margin-right: 40px;
  }
}

.days {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 20px;
}

.day {
  &__wrapper {
    width: 300px;

    background-color: #e4f9f5;

    padding: 16px;
    margin-right: 10px;
    margin-top: 20px;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__cabinet {
    padding-right: 20px;
  }

  &-cell {
    position: absolute;
    color: white;

    &__service {
      font-size: 12px;
      line-height: 1;
    }

    &__client {
      font-size: 12px;
      line-height: 1;
    }

    &__clean {
      position: absolute;
      left: 50px;
      background-color: #52616b;
      font-size: 12px;
      line-height: 1;
      color: white;
    }
  }
}

.table {
  &-rows {
    position: relative;
  }

  &-row {
    min-height: 40px;
    border: 1px solid #61c0bf;
    color: #61c0bf;
  }
}
</style>
